from django.test import TestCase, Client
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegistrationTest(TestCase):

    def setUp(self):
        self.client = Client()

    def test_user_registration(self):
        response = self.client.post('/users/register/', {
            'email': 'test@example.com',
            'password': 'testpass123'
        })

        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.first().email, 'test@example.com')
