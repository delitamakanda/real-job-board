from django.contrib import admin

from jobboard.models import Annonce, ObjectViewed

# Register your models here.
class AnnonceAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'is_available', 'enterprise', 'localization']
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ['is_available']
    search_fields = ['localization', 'enterprise__username']
    list_editable = ['is_available',]

    class Meta:
        model = Annonce


admin.site.register(Annonce, AnnonceAdmin)
admin.site.register(ObjectViewed)
