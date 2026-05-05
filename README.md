# Moments Prototype, visual direction + survey handoff

This is a lightweight clickable web prototype for testing the Moments concept on phones. It uses the provided Moments visual direction: warm white background, softer headline typography, the supplied Moments logo, iridescent bubble forms, and a simple mobile-first interaction flow.

## What is included

- `index.html` — the prototype page
- `styles.css` — the Moments visual design
- `app.js` — the clickable prototype logic and survey handoff

## How to add your survey link

1. Create your survey in Google Forms, Tally, Typeform or Microsoft Forms.
2. Copy the live share link.
3. Open `app.js`.
4. Find this line near the top:

```js
const SURVEY_URL = "https://forms.gle/7tKftafw9rZfwZBeA";
```

5. Replace the placeholder with your live survey link, for example:

```js
const SURVEY_URL = "https://forms.gle/your-form-link";
```

6. Save the file and upload the folder to your hosting service.

The final screen includes an **Open feedback survey** button. It appends the tester’s prototype choices to the survey URL as query data. Tally and Typeform can usually read this kind of hidden field data more easily than Google Forms. Google Forms will still open normally, but it will not automatically map the query data unless you use Google Forms pre-filled entry IDs.

## Suggested survey questions

Use these after people have tested the prototype:

1. Before using this prototype, how clear was the idea of Moments?
2. After using the prototype, how would you describe Moments in your own words?
3. How useful would Moments be for you personally?
   - Very useful
   - Somewhat useful
   - Not useful
   - Unsure
4. What part of the prototype felt most useful?
5. What part felt unclear, awkward or unnecessary?
6. Would you feel comfortable sharing your approximate location with a service like this?
   - Yes
   - Maybe, depending on privacy settings
   - No
7. What would need to be true for this to feel safe enough to use?
8. Would you prefer to meet someone:
   - Within 10 minutes
   - Within 30 minutes
   - Later the same day
   - Planned ahead
9. Which meeting types would you use?
   - Coffee
   - Walking meeting
   - Gallery / public space
   - Co-working space
   - Online first
10. Would you use Moments if it was connected to Design Assembly or another trusted design community?
11. Would you pay for this as part of a membership or service?
12. What would you change before this became a real app?
13. Any other thoughts or concerns?

## Phone testing

Upload the folder to a simple static web host such as Netlify, Vercel, GitHub Pages, or your own website. Then send testers the live URL. They can open it directly on their phones.

For a very quick informal test, you can also AirDrop or email the files to yourself and open `index.html`, but a hosted link is better for sending to other people.


## GitHub Pages upload

1. Create a new GitHub repository.
2. Upload all files and the `assets` folder from this folder to the repository root.
3. In GitHub, go to Settings > Pages.
4. Under Build and deployment, choose Deploy from a branch.
5. Select the `main` branch and `/root`, then Save.
6. Wait for GitHub to publish the site, then share the generated Pages URL with testers.

The final screen opens the live Google Form survey: https://forms.gle/7tKftafw9rZfwZBeA
