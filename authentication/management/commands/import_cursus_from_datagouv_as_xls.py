import xlrd
from django.utils.six.moves import range
from django.core.management.base import BaseCommand

from authentication.models import Cursus

SILENT, NORMAL, VERBOSE, VERY_VERBOSE = 0, 1, 2, 3


class Command(BaseCommand):
    help = (
        "Import cursus from a local xls file."
        "Expect title"
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "file_path",
            nargs=1,
            type=str,
        )

    def handle(self, *args, **options):
        verbosity = options.get("verbosity", NORMAL)
        file_path = options["file_path"][0]

        wb = xlrd.open_workbook(file_path)
        sh = wb.sheet_by_index(0)
        
        if verbosity >= NORMAL:
            self.stdout.write("=== Cursus imported ===")
        for rownum in range(sh.nrows):
            if rownum == 0:
                continue
            title = sh.row_values(rownum)
            cursus, created = Cursus.objects.get_or_create(
                title=title[0]
            )
            if verbosity >= NORMAL:
                self.stdout.write("{}. {}".format(
                    rownum, cursus.title
                ))