import os

dirs = os.listdir(os.getcwd() + "/AppImages")

string = "["

for file in dirs:
    string += "" + "\"AppImages/" + str(file) + "\","

if string.endswith(","):
    string = string[:-1]
    string += "]"

print("String = \n", string,"\n")
