import os

dirs = os.listdir(os.getcwd() + "/")

string = "["

for file in dirs:
    string += "" + "\"Image2/" + str(file) + "\","

if string.endswith(","):
    string = string[:-1]
    string += "]"

print("String = \n", string,"\n")
