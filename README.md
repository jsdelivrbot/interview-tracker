# Interview Tracker

Managing interviews across multiple organizations can be time-consuming and error-prone.
This application aim to ease some of the pain by offering a high level view of your
progress with each position to which you're applying. You can see all of your positions
at a glance, and drill down to see and record additional details for each position.

![Application Overview](https://github.com/brandonread/interview-tracker/blob/master/docs/images/overview.png)

I came up with this idea while interviewing for my second job, and finally got
around to implementing a crude example. This was a weekend hack!
Ignore some of the gross code here and there :P

The broader vision aims to integrate GMail, Google Calendar, LinkedIn, and AngelList
data to help the applicant better manage their interviews. Larger platform goals
aim to help people take control of their careers as an end-to-end solution.


Run the project

```
npm install
npm start
```

Visit `http://localhost:8080/` to use it! Enjoy :)

Note: Mock data is available, and all new data is stored in-memory and will be lost
when terminating the application.

Other Note: This application uses a boilerplate from StephenGrider.
See `LICENSE.MD` and https://github.com/StephenGrider/ReduxSimpleStarter.
