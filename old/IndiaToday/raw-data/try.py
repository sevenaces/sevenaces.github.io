# counter = 0
# with open('1-14-2013-Cover Story-Flashback 2012-Baby Boom; Starry Birthday; Item Numbers; Cannes Calling; Big Earners.txt', 'r') as searchfile:
#     for line in searchfile:
#         if 'a' in line:
#             counter = counter + 1
# print(counter)

from os import walk

fs = []
ps = ''
for (dirpath, dirnames, filenames) in walk("C:/wamp/www/sevenaces.github.io/IndiaToday/workingset"):
    fs.extend(filenames)
    break

for f in fs:
	if f.find('.txt') != -1:
		ps = f.split('-')
		del ps[2]
		for i in range(len(ps)-2):
			ps[2] += ps[2+i]
		ps[2] = ps[2].split('.txt')[0]
		print(ps[2])
		# print(len(ps))
		# for fileName in ps:
		# 	print(fileName)