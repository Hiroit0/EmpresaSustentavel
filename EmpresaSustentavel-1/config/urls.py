from django.urls import path, include
from escola.views import login_view, AlunosViewSet, ItensViewSet
from django.contrib import admin
from rest_framework import routers

app_name = 'appname'
router = routers.DefaultRouter()
router.register(r'alunos', AlunosViewSet)
router.register(r'itens', ItensViewSet)

urlpatterns = [
    path('login/', login_view.as_view()),
    path('admin/', admin.site.urls),
    path('', include(router.urls)), 

    # Defina outras URLs aqui
]
