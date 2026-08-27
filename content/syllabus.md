---
title: "Syllabus: Software Engineering"
heading_max_level: 2
collapsible_headings: true
---

<table class="!mt-4">
  <tr><td><strong>Course</strong></td><td>CSCI 338: Software Engineering</td></tr>
  <tr><td><strong>Instructor</strong></td><td>Dr. Sarah Van Wart (svanwart@unca.edu)</td></tr>
  <tr><td><strong>Prerequisites</strong></td><td>CSCI 202 and CSCI 235</td></tr>
  <tr><td><strong>Time &amp; Location</strong></td><td>Tu, Th 9:55 AM - 11:35 AM in RRO Rm. 217</td></tr>
  <tr><td><strong>Office Hours</strong></td><td>TBD in RRO Rm. 220</td></tr>
</table>

{:.info}
> ## Acknowledgements
> This course was designed in partnership with <a href="https://semmy.me/" target="_blank">Dr. Semmy Purewal</a>. We are very grateful to Semmy for bringing his industry knowledge to this class and helping the next generation of software engineers here at UNC Asheville learn from it. 

## 1. About the Course
Welcome to CSCI 338! Taking this course gives you the opportunity to work on a collaborative software development project while learning some of the tools, methods, and processes that are widely used in industry. We will be using some specific programming languages and libraries to explore various "big ideas" in software engineering. That said, the focus of this course is on the ***processes and tools*** that will enable you to build software that is ***scalable and maintainable over time*** (versus learning particular languages / libraries). Drawing from <a href="https://abseil.io/resources/swe-book" target="_blank">Software Engineering at Google</a> (one of the books we will use in this course), we will explore three categories of considerations:

{:.list-spaced}
1. **Culture** -- How people on teams can work well together; document and share knowledge; prioritize technical, social, and business goals; cultivate a curious, open, and critical perspective on their work; and measure the benefits and costs of technical decisions.
1. **Process** -- How to actually go about writing code, including coming up with style guides and coding conventions, doing code reviews, documenting your code, writing tests, deprecating features, and breaking down ideas into concrete features and tasks (so that you can make clear and manageable progress).
1. **Tools** -- Using different software tools to improve how your team manages their codebase. This includes tools for version control, building and compiling your system (particularly important for larger systems), managing dependencies, and ensuring that you are continuously integrating and deploying code changes.

By the end of this course, our hope is that you will view software engineering as set of tools and strategies for managing uncertainty, change, and competing priorities -- versus a fixed list of rules that you follow religiously. How software development proceeds depends on your goals, the constraints you are under, and the information and tools you have at your disposal. Given this, the more holistically you think about evaluating different trade-offs and choices, the more effective you will become.

<!-- topics and labs here -->


## 2. Course Format
The course format includes a mix of assigned readings, lectures, labs, projects, quizzes, and exams. We will generally try to use our Tuesday class time to discuss a "big idea" in software engineering, and our Thursday class time to complete hands-on labs. It is your responsibility to keep up-to-date on class material and announcements, as the schedule is subject to change. This includes material presented and announcements made in class, via email, or on Canvas.

### 2.1. Class Participation
Class meetings will be in person. Most class sessions have accompanying readings, which you will be expected to complete before class. Please do your best to be physically and mentally present, and to share your knowledge and experience with one another. 

### 2.2. Projects
The course includes two major projects that build toward increasingly independent and collaborative software development.

* **Project 1: Independent Contribution**
During the first half of the semester, the class will work in a shared codebase. Each student will independently implement, test, and submit one or more assigned features through a code-review workflow. I will serve as the primary coach and code reviewer.
* **Project 2: Team Development**
During the second half of the semester, students will work in small teams to design, build, and test a larger feature. Unlike Project 1, this work will be interdependent: teammates will need to coordinate their work and be able to rely on one another's contributions.

#### 2.2.1. Project Readiness

Because Project 2 requires interdependent development, students must demonstrate baseline independent programming ability before being assigned to a Project 2 team.

At the beginning of the semester, you will complete an ungraded programming diagnostic. Early labs and Project 1 will give you opportunities to practice the relevant skills.

Beginning in Week 5, you may complete an individual **Project Readiness Assessment**. The assessment is completed without GenAI, coding assistants, or help from other people. You must demonstrate that you can:

1. understand unfamiliar code;
2. independently implement a modest feature;
3. fluently use core programming constructs and data structures; and
4. debug and verify program behavior.

You must demonstrate satisfactory performance in all four areas to be designated **Project Ready**. If needed, additional attempts may be completed during office hours before Project 2 team assignments are finalized.

Students who are Project Ready will be assigned to Project 2 teams. Students who have not demonstrated readiness will complete a more structured individual project pathway instead.

The readiness assessment is not numerically graded. However, independent programming and collaborative software development are course outcomes. The individual Project 2 pathway therefore cannot earn full credit for outcomes requiring successful interdependent team development.


{:.blockquote-no-margin}
> **Note:** I am still figuring out how we will be organizing the projects. The current plan (described above) may change.

### 2.3. Labs
Labs are intended to be completed during class on Thursdays (unless otherwise specified), so that we can help you with any questions (or configuration issues) you make have. Each lab is designed to give you practice with a tool, technique, or workflow relevant to building collaborative software.

### 2.4. Programming Readiness Requirement
Project 2 team eligibility is determined by the Project Readiness policy described above. The readiness assessment itself is not a separate graded course component.

### 2.5. Exams
There will also be a midterm and a final exam to assess your understanding of some of the methods we are learning about (e.g., version control, tradeoffs, CI/CD, managing trade-offs, navigating constraints and uncertainty, dependency management, etc.).

## 3. Course Materials & Resources

### 3.1. Books
We will be reading selected chapters from  <a href="https://abseil.io/resources/swe-book" target="_blank">Software Engineering at Google</a>. There is a free copy of the book online, or you can order a hardcopy. 

### 3.2. Software
This course will utilize many different software packages, libraries, and tools (all free), including the ones listed below. You will probably need around 5GB of disk space to run these programs. Installing and configuring programming software can be a hassle, but it is part of the process of developing your working computing knowledge. We will help you. 

{:.compact}
* <a href="https://code.visualstudio.com/download" target="_blank">Visual Studio Code</a>
* <a href="https://github.com/git-guides/install-git" target="_blank">Git and the Github Client</a>
* <a href="https://www.docker.com/products/docker-desktop/" target="_blank">Docker Desktop</a>

### 3.3. Other Course Resources
We will also be compiling a list of cheatsheets, online tutorials, and documentation pages on the course [Readings and Resources](/resources/) page.

## 4. Grading
Your course grade is calculated based on projects, labs, exams, and attendance / participation:

{:.indented}
| Component | Weight |
| --- | --- |
| **Labs** | 30% |
| **Midterm Exam** | 15% |
| **Midterm Project** | 20% |
| **Final Exam** | 15% |
| **Final Project** | 20% |

Project 2 team eligibility is determined by the Project Readiness policy described above; the readiness assessment itself is not a separate graded course component.

> Please also see the attendance policy below: poor attendance will severely impact your grade.

### 4.1. Labs (30%)
Labs will be graded according to the following scale:

{:.indented}
| Score | Label | Meaning |
| --- | --- | --- |
| 0% | Not attempted | Assignment not submitted. |
| 50% | Check Minus | Assignment attempted but less than half of it was completed correctly. |
| 75% | Check | Most of the assignment was completed. |
| 100% | Check Plus | Assignment fully completed and works as expected. |


### 4.2. Projects (40%)
Projects involve building part of a larger system, and will be graded according to a rubric. We will be using a code review workflow for assessment.

**No late project deliverables will be accepted.**

### 4.3. Exams (30%)
Exams will be graded according to how thoroughly you answer the questions and drawing from the principles and readings covered of the course.

## 5. Course Policies
Please read this section closely. It is your responsibility to understand this policy and ask questions if you are unsure what these policies mean for you

### 5.1. Attendance
Regular attendance is a required part of CSCI 338. Much of our work will take place during class and will involve collaborative problem solving, project work, code review, and coordination with teammates. Missing class therefore affects not only your own learning, but also the work of other students who depend on your participation.

You may miss up to **3** class meetings without a grade penalty. You do not need to provide documentation or an explanation for these absences; they are intended to provide flexibility for illness, emergencies, appointments, and other circumstances that may arise during the semester.

Beginning with the fourth absence, **each additional missed class meeting will lower your final course grade by one half-letter grade**. For example, starting from an A:


{:.indented}
| Absences | Grade |
| --- | --- |
| 4 | A → A− |
| 5 | A → B+ |
| 6 | A → B |
| 7 | A → B− |
| 8+ | continues in half-letter steps |

The attendance penalty is applied after your final numerical course grade has been calculated from projects, labs, and exams.

Absences covered by an approved university accommodation or other applicable university policy will be handled in accordance with that policy. If circumstances arise that are likely to result in an extended absence, please contact me as soon as you reasonably can so that we can determine how they affect your ability to complete the course.

Because the course includes substantial team-based work, attendance alone does not guarantee credit for collaborative assignments. Students are expected to participate meaningfully in their team's work and may not receive credit for work completed primarily by their teammates.

### 5.2. Participation
This course depends on active participation and collaboration. When you are in class, you are expected to be physically and mentally present and to contribute to the work of the class and your team.

We will treat one another as professional adults. This means:

* Coming to class prepared and ready to participate in discussions, activities, labs, and project work.
* Contributing your ideas, questions, knowledge, and experience when they are relevant.
* Participating meaningfully in team activities and doing your share of collaborative work.
* Communicating clearly and respectfully with classmates, especially when your work affects or depends on theirs.
* Listening to and seeking to understand perspectives different from your own.
* Giving classmates the benefit of the doubt about their competence and intentions, and expecting the same in return.
* Helping create a learning environment characterized by respect, professionalism, and consideration for others.

Disagreement, questions, mistakes, and differing perspectives are welcome. Disrespectful, disruptive, or unethical behavior is not.

Participation does not require being the person who speaks most often. There are many ways to contribute meaningfully, including asking questions, helping a teammate, reviewing someone else's work, explaining an idea, debugging collaboratively, documenting decisions, or helping a group move forward.

### 5.3. Submitting Late Work
* **Labs:** Late labs will penalized 25% if they are turned in within a week of the deadline. After 1 week, late labs will not be accepted.
* **Project Deliverables:** No late project deliverables will be accepted.

### 5.4. Collaboration

* **Labs:** Helping other students with their in-class labs is allowed and encouraged, but each student should type their own solution unless otherwise specified in the lab instructions.
* **Projects:** Working with others is one of the most fundamental skills you will be practicing in this course. 

### 5.5. Using Outside Tools and Materials (Including GenAI)
In this class, I encourage you to explore the broader Internet for tutorials, code samples, new programming techniques, libraries, GenAI tools, and other useful resources. Computational tools and resources are integral to the subject matter of this course, and Generative Artificial Intelligence (GenAI) is one category that we may use, examine, or evaluate in class and in project work.

The appropriate use of GenAI and other tools and resources will vary by assignment. Regardless of what you use, you are responsible for understanding, evaluating, and explaining the work you submit. These tools and resources should support your learning rather than substitute for the knowledge, reasoning, programming, or analysis an assignment is designed to assess.

Specific expectations regarding permitted tools and resources will be provided with individual assignments. When in doubt, ask before using a tool or resource for an assignment.

Project Readiness Assessments must be completed independently without GenAI, coding assistants, assistance from another person, or other unapproved resources.

### 5.6. Class Cancellation Policy
If a class meeting is canceled or due dates are moved due to inclement weather or any other reason, we will inform you via campus email (ending with unca.edu).

## 6. University Policies

### 6.1. Office of Accessibility & Academic Accommodations
UNC Asheville is committed to providing an inclusive experience, accessible learning environments and equal opportunity to individuals with disabilities in accordance with the Americans with Disabilities Act (ADA) and Section 504 of the Rehabilitation Act. 

If you are a student experiencing barriers to access or full participation in this course on the basis of a disability, contact the Office of Accessibility to apply for reasonable accommodations and discuss available resources. You may contact the Office of Accessibility at academicaccess@unca.edu or 828-251-6292. 

Students are responsible for discussing their Letter of Accommodations (LOA) with their faculty. Students and faculty are encouraged to discuss the LOA as early in the semester as possible to allow for extended access to accommodations. However, students may disclose a disability at any point in the semester. Accommodations are not retroactive and are activated when the LOA is discussed.  

### 6.2. Promoting Gender Equity, Addressing Sexual Misconduct
UNC Asheville is dedicated to cultivating and maintaining a safe, respectful, and inclusive environment, free from harassment and discrimination. We strive to ensure that all have equal access to the educational and employment opportunities the University provides. If you or someone you know has been affected by sex-based harassment or sexual misconduct, including sexual assault, dating or domestic violence, or stalking, please know that help and support are available. UNC Asheville strongly encourages all members of the community to take action, seek support, and report incidents of sexual harassment to the Title IX Office.  You may contact the Title IX Office or Heather Lindkvist, the Title IX Coordinator, directly at 828.232.5658 or via titleix@unca.edu or learn more by visiting the Title IX website.

As a faculty member, I am a “responsible employee” and private resource. This means that if you share any information or discuss an incident with me regarding sexual or gender-based harassment, I must disclose this information to the Title IX Coordinator. Our goal is to ensure you are aware of the range of options available to you and have access to the resources you may need. 

If you wish to speak with a confidential resource, contact University Health and Counseling Services at 828.251.6520. Off-campus confidential resources include Our Voice (24-Hour Hotline at 828.255.7576) and Helpmate (24-Hour Hotline at 828.254.0516).

### 6.3. Academic Alerts
Faculty at UNC Asheville have access to an Academic Alert system. The purpose of this system is to support communication with students about their progress in courses, especially if there are concerns (e.g., academic difficulty, attendance problems). Professors use the Alert system because they are invested in their students’ success. Entering an academic alert is a great way to supplement open conversations between instructors and students about how students can improve their academic performance. 

When a faculty member submits an alert that expresses a concern, the student receives outreach from their academic advisor or the team in the Office of Academic Advising. Students are no longer receiving automated notification emails when an alert is submitted. It is in the student's best interest to address the alert quickly, as students who do so are more likely to earn credit for the course. Questions about the Academic Alert system can be directed to Anne Marie Roberts (amrober1@unca.edu) in the Academic Success Center.


### 6.4. Mental Health Support
As a student, you may experience a range of challenges that can interfere with learning, such as stressful life events, experiences of anxiety and/or depression, self-harm, substance use, and/or unusual difficulty with ordinary life activities. The increased stress of school can also make existing mental health struggles more difficult to manage. Support is available and treatment can help. Learn more about the confidential mental health services UNC Asheville provides to support student success at [https://www.unca.edu/life/health-counseling/](https://www.unca.edu/life/health-counseling/).

The Health and Counseling Center is located at 118 W.T. Weaver Boulevard. Appointments can be made by calling 828-251-6520. A UNC Asheville counselor on call is available after 5 p.m. and on weekends; the counselor on call can be accessed by calling the UNCA Campus Police dispatcher at 828-251-6710. Additionally available after hours and on weekends, call the Bulldog Health Link at 1-888-267-3675, where you can get immediate support for mental health, medical consultation, concern for a friend, and/or community resources. In case of an emergency, you can also call RHA’s Mental Health Mobile Crisis Unit at 1-888-573-1006.
