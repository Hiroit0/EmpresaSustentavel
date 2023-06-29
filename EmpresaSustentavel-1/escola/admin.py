from django.contrib import admin
from .models import Aluno, Itens

class Alunos(admin.ModelAdmin):
    list_display = ('username', 'cpf', 'password')
    list_display_links = ('username', 'cpf', 'password')
    search_fields = ('username', 'cpf',)

admin.site.register(Aluno, Alunos)
admin.site.register(Itens)
