from django.db import models

class Aluno(models.Model):
    username = models.CharField(max_length=30)
    cpf = models.CharField(max_length=11)
    password = models.CharField(max_length=10)

    def __str__(self):
        return self.username

class Itens(models.Model):
    # Defina os campos da classe "Itens" aqui
    produto = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    # Adicione outros campos conforme necessário

    def __str__(self):
        return self.produto
