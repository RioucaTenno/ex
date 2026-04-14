from django.http import HttpResponse
from django.contrib.auth import get_user_model

User = get_user_model()

def register(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        User.objects.create_user(
            username=email,
            email=email,
            password=password
        )
        return HttpResponse("User created", status=201)

    return HttpResponse("Only POST allowed", status=405)
