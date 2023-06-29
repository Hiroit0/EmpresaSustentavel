from rest_framework import serializers
from .models import Aluno, Itens

class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = ('id', 'username', 'cpf', 'password')

class ItensSerializer(serializers.ModelSerializer):
    class Meta:
        model = Itens
        fields = '__all__'
