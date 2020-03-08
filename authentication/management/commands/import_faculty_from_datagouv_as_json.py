import os
import requests
from io import StringIO
from django.utils.six.moves import range
from django.core.management.base import BaseCommand
from django.utils.encoding import force_text
from django.conf import settings
from django.core.files import File
from authentication.models import Campus, Faculty

SILENT, NORMAL, VERBOSE, VERY_VERBOSE = 0, 1, 2, 3

class Command(BaseCommand):
    help = "Import campus and faculties from datagouv as json"

    def handle(self, *args, **options):
        self.verbosity = options.get("verbosity", NORMAL)

        r = requests.get("https://api.opendata.onisep.fr/downloads/57da952417293/57da952417293.json")

        response_dict = r.json()

        if self.verbosity >= NORMAL:
            self.stdout.write("=== Faculties and Campus imported ===")

        self.save_page(response_dict)

    def save_page(self, response_dict):
        for r in response_dict:
            # campus, created = Campus.objects.get_or_create(
            #     name=force_text(r['nom']),
            #     address=force_text('%s - %s - %s' % (str(r['adresse']),  str(r['cp']), str(r['commune'])))
            # )
            faculty, created = Faculty.objects.get_or_create(
                name=force_text(r['nom']),
                color='#FFFFFF'
            )
            if self.verbosity >= NORMAL:
                # self.stdout.write("{}".format(
                #     campus.name
                # ))
                self.stdout.write("{}".format(
                    faculty.name
                ))
