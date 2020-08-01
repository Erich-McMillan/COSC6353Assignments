import pytest

import random
import string

import backend.modules.profile_management as profile

def test_street_address_city_len_cannot_be_greater_than_100():
   addr = profile.street_address()

   letters = string.ascii_lowercase
   addr.city = ''.join(random.choice(letters) for i in range(1000))

   assert len(addr.city) == 100

def test_street_address_state_len_cannot_be_greater_than_2():
   addr = profile.street_address()

   letters = string.ascii_lowercase
   addr.state = ''.join(random.choice(letters) for i in range(100))

   assert addr.state == ''

def test_street_address_state_len_cannot_be_less_than_2():
   addr = profile.street_address()

   letters = string.ascii_lowercase
   addr.state = ''.join(random.choice(letters) for i in range(100))

   assert addr.state == ''

def test_street_address_state_len_must_be_2():
   addr = profile.street_address()

   letters = string.ascii_lowercase
   addr.state = ''.join(random.choice(letters) for i in range(2))

   assert len(addr.state) == 2

def test_street_address_zipcode_len_can_be_5():
   addr = profile.street_address()

   letters = string.ascii_lowercase
   addr.zipcode = ''.join(random.choice(letters) for i in range(5))

   assert len(addr.zipcode) == 5

def test_street_address_zipcode_len_can_be_9():
   addr = profile.street_address()

   letters = string.ascii_lowercase
   addr.zipcode = ''.join(random.choice(letters) for i in range(9))

   assert len(addr.zipcode) == 9

def test_street_address_zipcode_len_cant_be_6():
   addr = profile.street_address()

   letters = string.ascii_lowercase
   addr.zipcode = ''.join(random.choice(letters) for i in range(6))

   assert addr.zipcode == ''