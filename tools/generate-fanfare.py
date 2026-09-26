"""Render the melody as PCM WAVs; no service or dependencies.
Separate mixes preserve volume choices on iOS, which may ignore element.volume.
"""
import math, pathlib, struct, wave

output=pathlib.Path(__file__).resolve().parents[1]/'dist/assets'
rate=22050
notes=[(523.25,0,.12),(523.25,.17,.12),(523.25,.34,.12),(659.25,.52,.19),(783.99,.77,.22),
       (523.25,1.03,.55),(659.25,1.03,.55),(783.99,1.03,.55),(1046.5,1.03,.55)]
for volume in (.25,.65,1):
    samples=[]
    for i in range(round(rate*1.68)):
        sample=0
        for frequency,start,duration in notes:
            t=i/rate-start
            if not 0<=t<duration:continue
            peak=.18*volume
            gain=peak*t/.015 if t<.015 else peak*(.0001/peak)**((t-.015)/(duration-.015))
            triangle=8/math.pi**2*sum((-1)**((k-1)//2)*math.sin(2*math.pi*k*frequency*t)/k**2 for k in range(1,16,2) if k*frequency<rate/2)
            sample+=gain*triangle
        assert abs(sample)<1,'Audio would clip'
        samples.append(round(sample*32767))
    assert max(map(abs,samples))>1000
    with wave.open(str(output/f'fanfare-{round(volume*100)}.wav'),'wb') as audio:
        audio.setparams((1,2,rate,len(samples),'NONE','not compressed'))
        audio.writeframes(struct.pack('<'+'h'*len(samples),*samples))
print('OK: fanfarria en tres volúmenes, 1.68 segundos, sin saturación.')
