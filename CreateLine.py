import os

dirs = os.listdir(os.getcwd() + "/Hall2")

string = "["

for file in dirs:
    string += "" + "\"Hall2/" + str(file) + "\","

if string.endswith(","):
    string = string[:-1]
    string += "]"

print("String = ", string)
