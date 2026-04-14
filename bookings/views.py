from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from .models import Booking

@login_required
def create_booking(request):
    if request.method == 'POST':
        Booking.objects.create(
            user=request.user,
            start_time=request.POST['start_time'],
            end_time=request.POST['end_time']
        )
        return HttpResponse("Booking created", status=201)

    return HttpResponse("Only POST allowed", status=405)
