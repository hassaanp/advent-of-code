# Part 1
left = []
right = []

with open('/data.txt', 'r') as file:
    for line in file:
        values = line.split()
        left.append(int(values[0]))
        right.append(int(values[1]))
left.sort()
right.sort()

diff = 0

for index, _ in enumerate(left):
    diff += abs(left[index]-right[index])

print(diff)

# Part 2
left = []
right = []

with open('/data.txt', 'r') as file:
    for line in file:
        values = line.split()
        left.append(int(values[0]))
        right.append(int(values[1]))
left.sort()
right.sort()
similarity_score = 0
for item in left:
  found = 0
  for value in right:
    if (item == value):
      found += 1
  similarity_score += item * found

print(similarity_score)
