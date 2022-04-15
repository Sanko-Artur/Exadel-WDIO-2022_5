Feature: User Creation

  Background:
    When I go to "https://viktor-silakov.github.io/course-sut/"
    When I login as: "walker@jw.com", "password"

  Scenario: Create user
    When I go to "Create User" menu item
    When I fill form:
      """
      email: 'walker@jw.com'
      password: 'password'
      address1: 'Rustaveli 20-21'
      address2: 'flor 4'
      city: 'Tbilisi'
      zip: 222567
      description: 'test user'
      """

# npx wdio -f cucumber --spec features/HW_3/createUser.feature