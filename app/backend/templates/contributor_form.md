---
subject: "New sign up"
---

{% from "macros.html" import button, link, support_email, email_link, newline %}

Name: {{ form.user.name|couchers_escape }}{{ newline(html)|couchers_safe }}
Email: {{ form.user.email|couchers_escape }}{{ newline(html)|couchers_safe }}
Username: {{ form.user.username|couchers_escape }}{{ newline(html)|couchers_safe }}
Profile: {{ link(user_link, html)|couchers_safe }}

Wants to contribute: {{ ("missing" if not form.contribute else form.contribute.name)|couchers_escape }}{{ newline(html)|couchers_safe }}
Ways: {{ ("missing" if not form.contribute_ways else ", ".join(form.contribute_ways))|couchers_escape }}

* Age{{ newline(html)|couchers_safe }}
{{ form.user.age|couchers_escape }}

* Gender{{ newline(html)|couchers_safe }}
{{ form.user.gender|couchers_escape }}

* Country and city{{ newline(html)|couchers_safe }}
{{ form.user.city|couchers_escape }} (tz: {{ form.user.timezone|couchers_escape }})

* What expertise do you have that could help build and grow Couchers.org?{{ newline(html)|couchers_safe }}
{{ (form.expertise or "missing")|couchers_escape }}

* Briefly describe your experience as a couch surfer.{{ newline(html)|couchers_safe }}
{{ (form.experience or "missing")|couchers_escape }}

* Please share any ideas you have that would improve the couch surfing experience for you and for the community.{{ newline(html)|couchers_safe }}
{{ (form.ideas or "missing")|couchers_escape }}

* What feature would be most important to you? How could we make that feature as good as possible for your particular use?{{ newline(html)|couchers_safe }}
{{ (form.features or "missing")|couchers_escape }}{{ newline(html)|couchers_safe }}
