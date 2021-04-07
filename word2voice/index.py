import wave
pcm_path = r'test.pcm'

with open(pcm_path, 'rb') as pcmfile:
    pcmdata = pcmfile.read()
with wave.open('test.wav', 'wb') as wavfile:
    wavfile.setparams((1, 2, 16000, 0, 'NONE', 'NONE'))
    wavfile.writeframes(pcmdata)
    print('ok')
