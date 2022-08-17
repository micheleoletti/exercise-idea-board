# Test philosophy

The purpose of testing is gaining confidence.
I should be confident that the software actually does what it's supposed to.

The key features of this software are:

- login
- logout
- create note
- edit note
- delete note
- sort notes
- updated time updating
- character countdown

Ideally, we would have a human, the final user, testing the product, so for testing I always start with E2E testing in mind.

However, in most cases it's very cost/time ineffective to test every specification through E2E testing.
I would say the cost effectiveness of E2E testing is directly proportional to the number of entities involved to deliver that specification, so the smaller it is the less it makes sense.

In that case it starts to make sense to start poking holes in reality, sacrificing some confidence in order to gain speed and reduce costs.

## How do we poke holes in reality?

Instead of setting up whole pages and rendering everything, we start to:

- rendering only what we want to test, omitting the rest
- mocking services

The tools at our disposal are:

- Cypress (E2E), spins up a browser, render the whole page and perform all the defined action like a human would, asserting the correct functioning of the product as a whole
- RTL (INTEGRATION/UNIT), renders the defined component and perform assertions within that limited context

So the testing plan becomes:

- login: E2E
- logout: E2E
- create note: INTEGRATION/UNIT
- edit note: INTEGRATION/UNIT
- delete note: INTEGRATION/UNIT
- note autofocus: INTEGRATION/UNIT
- sort notes: INTEGRATION/UNIT
- check updated time: INTEGRATION/UNIT
- character countdown: INTEGRATION/UNIT
