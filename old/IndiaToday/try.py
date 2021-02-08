import sys
from os import walk
import json

fs = []
ps = ''
words = ['Sonia', "Manmohan", "Modi", "Advani"]
parties = [1, 1, 0, 0]
data = []
counter = 0
jsonD = {}
serial = 0
zeroFlag = 0
workingset = "C:/wamp/www/sevenaces.github.io/IndiaToday/workingset/"
for (dirpath, dirnames, filenames) in walk(workingset):
    fs.extend(filenames)
    break

for f in fs:
	ps = f.split('-')
	if len(ps[0]) == 1:
		ps[0] = '0' + ps[0]
	if len(ps[1]) == 1:
		ps[1] = '0' + ps[1]
	del ps[2]
	
	ps[2] = ''.join(ps[2:len(ps)])
	del ps[3:len(ps)]
	with open(workingset + f) as searchfile:
		zeroFlag = 0
		temp = []
		for word in words:
			counter = 0
			for line in searchfile:
				if word.lower() in line.lower():
					counter += 1
					zeroFlag = 1
			if zeroFlag == 1:
				record = {"name": word, "freq": counter, "party": parties[words.index(word)]}
				temp.append(record)
				# print(str(serial) + " " + str(record))
				print(record)
			ps.append(word)
			ps.append(counter)
		jsonD[ps[0]+ ps[1] + str(serial).zfill(4)] = temp
	serial = serial + 1
# print(jsonD)

try:
	open('./data/data.json', 'w').write(str(jsonD).replace('\'','\"'))
	print("Sucess, entries written to data.json")
except:
	"Failure"
