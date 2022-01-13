from os import system

a = [
    "python .\manage.py makemigrations",
    "python .\manage.py migrate",
    "python .\manage.py runserver",
]

for x in a:
    system(x)
