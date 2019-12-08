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



## Resources useful
- [gitlab](https://gitlab.com/georgedorn/django-python-job-board/blob/master/python_job_board/models.py)
- [Django Girls](https://tutorial.djangogirls.org/fr/)
- [Django Girls: extensions](https://tutorial-extensions.djangogirls.org/en/)
- [Flutter Sidebar & Dashboard](https://youtu.be/VzuHfHyJcuI)
- [Flutter Routing](https://www.youtube.com/watch?v=JWuXj0BY_s4)
- [Flutter multi page applications](https://proandroiddev.com/flutter-creating-multi-page-application-with-navigation-ef9f4a72d181)
- [Flutter icons](https://api.flutter.dev/flutter/material/Icons-class.html)

- [Flutter Django Search](https://medium.com/flutter-community/django-search-flutter-1cb3e8a5db1a)


## Flutter
- https://flutter.dev/docs/get-started/web

export variables environment flutter
```
export PATH=/Users/delitamakanda/Desktop/flutter/bin:$PATH
```

how to know connected devices
```
flutter devices
```

run the web app
```
flutter run -d chrome
```

run ios simulator
```
flutter run -d <device-id>
```

press ```r``` to hot reload

build web app
```
flutter build web
```

voilà :)
