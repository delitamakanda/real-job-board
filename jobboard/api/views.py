from rest_framework import viewsets
from ..models import Annonce
from .serializers import AnnonceSerializer

class AnnonceViewSet(viewsets.ModelViewSet):
    queryset = Annonce.objects.all()
    serializer_class = AnnonceSerializer