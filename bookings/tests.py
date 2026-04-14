from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from .models import Booking

User = get_user_model()

class BookingTest(TestCase):

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username='user@test.com',
            password='password123'
        )
        self.client.login(username='user@test.com', password='password123')

    def test_create_booking(self):
        response = self.client.post('/bookings/create/', {
            'start_time': '2025-01-01 10:00',
            'end_time': '2025-01-01 12:00'
        })

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Booking.objects.count(), 1)
