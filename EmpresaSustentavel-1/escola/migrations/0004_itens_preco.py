# Generated by Django 4.2.2 on 2023-06-27 18:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('escola', '0003_itens'),
    ]

    operations = [
        migrations.AddField(
            model_name='itens',
            name='preco',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=8),
        ),
    ]
