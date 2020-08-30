# dope job app [![CircleCI](https://circleci.com/gh/delitamakanda/dopejob/tree/master.svg?style=svg)](https://circleci.com/gh/delitamakanda/dopejob/tree/master)
app for job finding in django framework

## requirements
* python3
* django 2.0

set virtual environement with virtualenv with python3 support:

```bash
virtualenv venv -p python3
```

for mac users
```bash
source venv/bin/activate
```

for windows users
```bash
.\venv\Scripts\activate
```

install packages for django
```bash
pip install -r requirements-dev.txt
```

create a config file .env in your root folder, same level than manage.py with the content below
```text
SECRET_KEY=dummy_secret_key
DEBUG=True
OTHER_VARIABLE=variable_1
```

Migrate models to db via orm
```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

Run local server
```bash
python3 manage.py runserver
```

# commands
```
python3 manage.py import_job_title_from_onisep_as_xml
```

```
python3 manage.py import_cursus_from_datagouv_as_xls data/cursus.xls
```

```
python3 manage.py import_faculty_from_datagouv_as_json
```