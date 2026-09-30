"""Build-time only: pip install edge-tts==7.2.8, then run after voice-catalog.cjs.
Sends the approved lesson catalog to Microsoft; no child responses are collected.
"""
import asyncio, json, pathlib, re, sys
import edge_tts

root=pathlib.Path(__file__).resolve().parents[1]
catalog=json.loads(pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'))
if any(not re.fullmatch(r'[a-f0-9]{20}\.mp3',item['file']) for item in catalog):
    raise ValueError('Invalid audio filename')
output=root/'dist/assets/voice'
output.mkdir(parents=True,exist_ok=True)
limit=asyncio.Semaphore(8)
completed=0

async def generate(item):
    global completed
    destination=output/item['file']
    async with limit:
        if not destination.exists() or destination.stat().st_size<1000:
            temporary=destination.with_suffix('.part')
            for attempt in range(3):
                try:
                    await edge_tts.Communicate(item['text'],'es-CL-CatalinaNeural',rate='-5%').save(str(temporary))
                    if temporary.stat().st_size<1000: raise RuntimeError('Empty audio')
                    temporary.replace(destination)
                    break
                except Exception:
                    if attempt==2: raise
                    await asyncio.sleep(2*(attempt+1))
        completed+=1
        if completed%50==0 or completed==len(catalog):print(f'{completed}/{len(catalog)} audios',flush=True)

async def main():
    await asyncio.gather(*(generate(item) for item in catalog))
    manifest={'name':'Catalina Neural · español de Chile','files':{x['key']:x['file'] for x in catalog}}
    (root/'dist/voice.js').write_text('const RECORDED_VOICE = '+json.dumps(manifest,ensure_ascii=False,separators=(',',':'))+';\nif(typeof module!=="undefined")module.exports=RECORDED_VOICE;\n',encoding='utf-8')
    print(f'Listo: {sum(p.stat().st_size for p in output.glob("*.mp3"))/1024/1024:.1f} MB',flush=True)

asyncio.run(main())
