import os

dirs = os.listdir(os.getcwd() + "/HallImages")

string = "["

for file in dirs:
    string += "" + "\"HallImages/" + str(file) + "\","

if string.endswith(","):
    string = string[:-1]
    string += "]"

print("String = ", string)
