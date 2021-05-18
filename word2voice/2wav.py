import os

m4a_path = "./m4a/"

m4a_file = os.listdir(m4a_path)

for i, m4a in enumerate(m4a_file):
    os.system("/Users/jinyan/Desktop/shawVi_file/ffmpeg -i "+ m4a_path + m4a 
    + " " + m4a_path + str(i) + ".wav" )