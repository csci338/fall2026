export const baseTopics = [
    {
      id: 1,
      title: "Intro to Software Engineering",
      description: "This unit introduces the idea of software engineering, including how it is similar and different from programming, and a host of considerations for building software that is scalable and maintainable over time.",
      meetings: [
        {
          date: "Tu, Aug 18",
          topic: "Intro to the Course",
          description: "This unit introduces the idea of software engineering, including how it is similar and different from programming, and a host of considerations for building software that is scalable and maintainable over time.",
          activities: [
            { title: "Intro to the Course", url: "https://docs.google.com/presentation/d/1NO-Wl5fCOtgggDkwjqFbNeFTSLmQXtPs/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
            { title: "Warm Up", url: "https://docs.google.com/document/d/1Gtxjhx6DO9LlDaCnOieB-K6Rvv14EtPH/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          discussionQuestions: [
            { question: "How is software engineering different from programming?" },
            { question: "Is software engineering actually engineering? Why or why not?" },
            { question: "Why not just aim for \"nothing changes\"?" },
            { question: "What is Hyrum's Law?" },
            { question: "How should decisions be made on software engineering teams? Name some better and worse ways of making decisions." },
            { question: "What do we mean by trade-offs?" },
            { question: "What is \"shifting left\"?" },
            { question: "<a href=\"https://docs.google.com/document/d/1cBdqsCEobdzdNiGrISZip3Xm45bs0VgfWyM9rJM7M8A/edit?usp=sharing\" target=\"_blank\">Sample command line quiz questions</a>" },
          ],
        },
        {
          date: "Th, Aug 20",
          topic: "What is Software Engineering?",
          activities: [
            { title: "What is Software Engineering?", url: "https://docs.google.com/presentation/d/1R-kcV7qoy0EA924nqrB8W2doX5VJFHEC/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          readings: [
            { citation: "Preface. Software Engineering at Google", url: "https://abseil.io/resources/swe-book/html/pr01.html" },
            { citation: "Chapter 1. What is Software Engineering?", url: "https://abseil.io/resources/swe-book/html/ch01.html" },
          ],
          optionalReadings: [
            { citation: "Configuring WSL", url: "/resources/wsl" },
            { citation: "Command line cheat sheet", url: "/resources/command-line" },
            { citation: "Configuring zsh/bash", url: "https://shreevatsa.wordpress.com/2008/03/30/zshbash-startup-files-loading-order-bashrc-zshrc-etc/" },
            { citation: "VS Code", url: "/resources/vs-code" },
            { citation: "vim", url: "/resources/vim" },
            { citation: "emacs", url: "/resources/emacs" },
          ],
        },
        {
            date: "Su, Aug 23",
            topic: "Last day to add / drop",
          }
      ],
    },

    {
      id: 2,
      title: "Version Control & Branch Management",
      description: "Version control is perhaps one of the most important topics in software engineering. Version control systems allow teams to collaborate on projects, review one another's code, experiment with new features and ideas, and revert to previous versions when needed. In this unit, we will explore different approaches that teams might take to organize their code repositories. We will also do various hands-on activities so that you can familiarize yourself with bash and git commands.",
      meetings: [
        {
          date: "Tu, Aug 25",
          topic: "Intro to Version Control",
          description: "Version control is perhaps one of the most important topics in software engineering. Version control systems allow teams to collaborate on projects, review one another's code, experiment with new features and ideas, and revert to previous versions when needed. In this unit, we will explore different approaches that teams might take to organize their code repositories. We will also do various hands-on activities so that you can familiarize yourself with bash and git commands.",
          activities: [
            { title: "Intro to Version Control", url: "https://docs.google.com/presentation/d/1CJeCcZvtlv50V5THh3DxDZvRROZXIno9/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          readings: [
            { citation: "Chapter 16. Version Control and Branch Management", url: "https://abseil.io/resources/swe-book/html/ch16.html" },
          ],
          discussionQuestions: [
            { question: "Why is version control important?" },
            { question: "Why is code history important?" },
            { question: "What is the difference between centralized and distributed version control?" },
            { question: "What is the problem with having long-running dev branches? What is the solution?" },
            { question: "What is the one version rule?" },
            { question: "What are the tradeoffs of having a \"monorepo\" versus multiple repos?" },
            { question: "What is the difference between git and GitHub?" },
            { question: "What is the difference between a merge commit and rebasing? What would you want to do one over the other (i.e., what are the the tradeoffs of each)?" },
            { question: "What does the \"origin\" typically refer to?" },
            { question: "What is a public / private key pair?" },
            { question: "What do the following git commands do? <code>clone</code>, <code>status</code>, <code>add</code>, <code>log</code>, <code>commit</code>, <code>push</code>, <code>pull</code>, <code>merge</code>, <code>rebase</code>" },
            { question: "What do the following bash commands do? <code>ls</code>, <code>cat</code>, <code>mv</code>, <code>pwd</code>, <code>cd</code>, <code>rm</code>" },
          ],
        },
        {
          date: "Th, Aug 27",
          topic: "Introduction to Lab 2",
          activities: [
            { title: "Introduction to Lab 2", url: "https://docs.google.com/presentation/d/1iBYAdOWcRUqr_Oc0O0ss0F0PFG2ulR9g/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
        },
        {
          date: "Tu, Sep 1",
          topic: "Version Control and Collaborative Workflows",
          activities: [
            { title: "Version Control and Collaborative Workflows", url: "https://docs.google.com/presentation/d/1-hRdUlYno040jHsVn3H1urpkMpDp58As/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          readings: [
            { citation: "<a href=\"https://en.wikipedia.org/wiki/git\" target=\"_blank\">Git Wikipedia article </a><br>Read the \"History\" and \"Characteristics\" sections." },
          ],
          optionalReadings: [
            { citation: "<a href=\"https://git-scm.com/book/en/v2\" target=\"_blank\">Pro Git book</a><br>The Pro Git book provides some useful context and conceptual models, particularly 2.1-2.5, 3.1-3.1, and 3.6." },
          ],
        },
        {
          date: "Th, Sep 3",
          topic: "Intro to Lab 3",
          activities: [
            { title: "Intro to Lab 3", url: "https://docs.google.com/presentation/d/1ucN6atlHcSLyE7n6Tcdj2fo4X_8rqDig/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          readings: [
            { citation: "Collaborating with git and GitHub (video)", url: "https://www.youtube.com/watch?v=_wQdY_5Tb5Q" },
          ],
          optionalReadings: [
            { citation: "What is git rebase? (video)", url: "https://www.youtube.com/watch?v=_UZEXUrj-Ds" },
            { citation: "How to rebase + handle merge conflicts", url: "https://www.atlassian.com/git/tutorials/comparing-workflows" },
          ],
        },
      ],
    },

    {
      id: 3,
      title: "Everything As Code (+ Docker)",
      description: "In this unit, we will explore the idea of formalizing your entire software stack using code (e.g. operating system configurations, dependencies, documentation, and more). Even if your team is collaborating on the same codebase, if each team member is developing software with a different compiler, interpreter, language version, operating system, etc., you will likely run into conflicts and inconsistencies. Give this, you will learn about why \"everything as code\" is such an important idea, and some tools and strategies for managing your system stack over time.",
      meetings: [
        {
          date: "Tu, Sep 8",
          topic: "Version Control Wrap",
          description: "In this unit, we will explore the idea of formalizing your entire software stack using code (e.g. operating system configurations, dependencies, documentation, and more). Even if your team is collaborating on the same codebase, if each team member is developing software with a different compiler, interpreter, language version, operating system, etc., you will likely run into conflicts and inconsistencies. Give this, you will learn about why \"everything as code\" is such an important idea, and some tools and strategies for managing your system stack over time.",
          activities: [
            { title: "Version Control Wrap", url: "https://docs.google.com/presentation/d/1s3y_CCh3H1InClBD659LOSIY39pFNKX_/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
            { title: "Coding Practice", url: "https://docs.google.com/document/d/1xio34-aAAFzljgeVkWKnbla0nyEzTXIh/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          readings: [
            { citation: "Everything as Code", url: "https://youtu.be/HcmPi7-IVQo" },
            { citation: "Docker Wikipedia article", url: "https://en.wikipedia.org/wiki/Docker_(software)" },
          ],
          discussionQuestions: [
            { question: "What were servers \"back in the day\"? What are servers now?" },
            { question: "What kinds of server challenges do administrators need to be able to handle?" },
            { question: "What is virtualization? What is containerization? How are they different?" },
            { question: "What is the difference between declarative and imperative code? What are some examples of each?" },
            { question: "Besides your application's source code, what other kinds of things should you also represent as code?" },
            { question: "What are some of the advantages of putting all aspects of your system in terms of code?" },
            { question: "What is Docker and why is it useful?" },
            { question: "Be able to explain the following Docker concepts: <em>image</em>, <em>container</em>, <em>volume</em>, <em>bind mount</em>" },
          ],
        },
        {
          date: "Th, Sep 10",
          topic: "Everything as Code",
          activities: [
            { title: "Everything as Code", url: "https://docs.google.com/presentation/d/1jUycpTRuO-qw-wokBCKUh3MvJQcEc0uF/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          optionalReadings: [
            { citation: "Docker cheat sheet reference", url: "https://docs.docker.com/get-started/docker_cheatsheet.pdf" },
          ],
        },
      ],
    },

    {
      id: 4,
      title: "Package & Dependency Management",
      description: "When developing software, it is common to rely on dependencies -- code that has been developed by other people. However, <em>your code</em> isn't the only code that changes. Dependencies (and their dependencies, and their dependencies' dependencies) also evolve over time as new features are added and bugs are patched. Given this, in this unit we will examine some tools, approaches, and considerations for managing code dependencies. We will also experiment with a few different dependency management tools, such as npm, poetry, and apt.",
      meetings: [
        {
          date: "Tu, Sep 15",
          topic: "Package & Dependency Management",
          description: "When developing software, it is common to rely on dependencies -- code that has been developed by other people. However, <em>your code</em> isn't the only code that changes. Dependencies (and their dependencies, and their dependencies' dependencies) also evolve over time as new features are added and bugs are patched. Given this, in this unit we will examine some tools, approaches, and considerations for managing code dependencies. We will also experiment with a few different dependency management tools, such as npm, poetry, and apt.",
          activities: [
            { title: "Package & Dependency Management", url: "https://docs.google.com/presentation/d/1p3iEMGavYPvR6LiItAfsUHaiWbSnsy2s/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          readings: [
            { citation: "Chapter 21. Dependency Management", url: "https://abseil.io/resources/swe-book/html/ch21.html" },
            { citation: "How one programmer broke the internet by deleting a tiny piece of code.", url: "https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code" },
            { citation: "NPM’s \"everything\" debacle.", url: "https://socket.dev/blog/when-everything-becomes-too-much" },
          ],
          optionalReadings: [
            { citation: "Havoc Pennington's 2017 blog post (Outlines the problems with non-exact dependency resolution)", url: "https://blog.ometer.com/2017/01/10/dear-package-managers-dependency-resolution-results-should-be-in-version-control/" },
            { citation: "Facebook's blog post upon the release of yarn (How did Facebook solve some of the dependency resolution challenges noted in our other readings?)", url: "https://engineering.fb.com/2016/10/11/web/yarn-a-new-package-manager-for-javascript/" },
          ],
          discussionQuestions: [
            { question: "What do we mean by \"dependency management\"?" },
            { question: "What happened in the \"leftpad\" debacle? What happened in the \"everything\" debacle? Why should we care?" },
            { question: "What are the trade-offs associated with relying on dependencies?" },
            { question: "What should you consider before adding a new dependency to your software project?" },
            { question: "What are some challenges with upgrading dependencies?" },
            { question: "What are some dependencies that we have used in this class?" },
            { question: "What are some common features of a good dependency management system?" },
            { question: "What is the purpose of the Poetry lock file and the package.json lock file?" },
            { question: "Different dependency management systems are used for different parts of the software stack. What are some examples of dependency managers that are used for: <em>operating systems</em>, <em>software languages (e.g., python, node.js, ruby, etc.</em>, <em>server configuration</em>?" },
          ],
        },
      ],
    },

    {
      id: 5,
      title: "Testing, Static Analysis, & Continuous Integration (CI)",
      description: "Continuous integration (CI), static analysis, and testing are complementary software development techniques that ensure that teams can deploy software continuously with a high degree of confidence in the quality of their code. In this unit, we will learn about ways you and your team can automate code testing and validation procedures before merging code updates into the main branch. By setting up a few tools up front, you will save time and energy and increase the reliability of your code base.",
      meetings: [
        {
          date: "Tu, Sep 22",
          topic: "Intro to Testing",
          description: "Continuous integration (CI), static analysis, and testing are complementary software development techniques that ensure that teams can deploy software continuously with a high degree of confidence in the quality of their code. In this unit, we will learn about ways you and your team can automate code testing and validation procedures before merging code updates into the main branch. By setting up a few tools up front, you will save time and energy and increase the reliability of your code base.",
          activities: [
            { title: "Intro to Testing", url: "https://docs.google.com/presentation/d/18N6d1HKbHKsgR-maWlt2Pp2sZp7A8XTP/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          readings: [
            { citation: "High-level overview of unit v. integration testing", url: "https://circleci.com/blog/unit-testing-vs-integration-testing" },
            { citation: "Chapter 11. Testing Overview", url: "https://abseil.io/resources/swe-book/html/ch11.html" },
          ],
          discussionQuestions: [
            { question: "<span class=\"badge-dark\">general</span> What does \"shifting left\" mean?" },
            { question: "<span class=\"badge-dark\">testing</span> What are some of the benefits of automated testing?" },
            { question: "<span class=\"badge-dark\">testing</span> What are some of the limits of automated testing?" },
            { question: "<span class=\"badge-dark\">testing</span> What are the different test \"sizes\"? Why are these distinctions important?" },
            { question: "<span class=\"badge-dark\">testing</span> What is meant by \"nondeterminism\" in testing?" },
            { question: "<span class=\"badge-dark\">testing</span> What are some important qualities of a testing suite?" },
            { question: "<span class=\"badge-dark\">testing</span> What are some considerations that go into writing testable code?" },
            { question: "<span class=\"badge-dark\">testing</span> What is the difference between an interpreted and a compiled language?" },
            { question: "<span class=\"badge-dark\">static analysis</span> What languages are interpreted? What languages are compiled?" },
            { question: "<span class=\"badge-dark\">static analysis</span> What do we mean by \"static\"?" },
            { question: "<span class=\"badge-dark\">static analysis</span> What are some examples of static analysis tools?" },
            { question: "<span class=\"badge-dark\">static analysis</span> What are some of the benefits of doing static analysis?" },
            { question: "<span class=\"badge-dark\">static analysis</span> What are some of the challenges / limitations of static analysis?" },
            { question: "<span class=\"badge-dark\">CI</span> What is continuous integration?" },
            { question: "<span class=\"badge-dark\">CI</span> What are some of the key benefits and headaches (i.e. tradeoffs) of continuous integration?" },
            { question: "<span class=\"badge-dark\">CI</span> Can you still use CI if you're working on a really big feature that’s not ready for prime time?" },
            { question: "<span class=\"badge-dark\">CI</span> What happens in the \"presubmit\" phase?" },
            { question: "<span class=\"badge-dark\">CI</span> What is release candidate testing? How is it similar / different from the \"presubmit\" phase?" },
          ],
        },
        {
          date: "Tu, Sep 29",
          topic: "Static Analysis & Continuous Integration",
          activities: [
            { title: "Static Analysis & Continuous Integration", url: "https://docs.google.com/presentation/d/1IUBjHLwGkYh-8xpPIC05Xahmj34cqPDd/edit?usp=sharing&rtpof=true&sd=true", draft: 0 },
            { title: "Team Preferences", url: "https://docs.google.com/document/d/1vD70DFplPXg6YxEaYDHPFGWznhVuDlgH/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          readings: [
            { citation: "Chapter 20. Static Analysis", url: "https://abseil.io/resources/swe-book/html/ch20.html" },
            { citation: "Chapter 23. Continuous Integration", url: "https://abseil.io/resources/swe-book/html/ch23.html" },
          ],
        },
        {
          date: "Th, Oct 1",
          topic: "Testing, Static Analysis, & Continuous Integration (CI)",
        }
      ],
    },

    {
      id: 6,
      title: "Midterm Exam Review & Midterm",
      description: "",
      meetings: [
        {
          date: "Tu, Oct 6",
          topic: "Fall Break",
          holiday: true,
        },
        {
          date: "Th, Oct 8",
          topic: "Mid-Semester Review",
          activities: [
            { title: "Mid-Semester Review", url: "https://docs.google.com/presentation/d/1gpnnmQMhnbPIN9LNTKmgwA9xCRFfC3cA/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
            { title: "Mid Semester Review Cheat Sheet", url: "https://docs.google.com/document/d/1ndbJIzzeThLWx43AvMR9wdzi0HVCeWHQ/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          readings: [
            { citation: "Please review all of the readings and study questions assigned thus far, in preparation for the mid-term review." },
          ],
        },
        {
          date: "Tu, Oct 13",
          topic: "Midterm Exam",
        },
      ],
    },

    {
      id: 7,
      title: "Back-End: the MVC Design Pattern + AsyncIO",
      description: "",
      meetings: [
        {
          date: "Th, Oct 15",
          topic: "AsyncIO + MVC",
          activities: [
            { title: "AsyncIO + MVC", url: "https://docs.google.com/presentation/d/1dB3iqBd20_sxRJStpBi9uSMdzA80xZdX/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          readings: [
            { citation: "<a href=\"https://medium.com/@moraneus/mastering-pythons-asyncio-a-practical-guide-0a673265cf04\" target=\"_blank\">Mastering Python’s Asyncio: A Practical Guide</a>" },
          ],
          optionalReadings: [
            { citation: "<a href=\"https://www.youtube.com/watch?v=RIVcqT2OGPA\" target=\"_blank\">AsyncIO and the Event Loop Explained</a>" },
          ],
        },
        {
          date: "Tu, Oct 20",
          topic: "MVC Lab Slides",
          activities: [
            { title: "MVC Lab Slides", url: "https://docs.google.com/presentation/d/1Phlll9bNNabM4nyGMQGWq4sEAW8w4Ncq/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
        },
      ],
    },

    {
      id: 8,
      title: "Back-End: Databases & ORMs",
      description: "",
      meetings: [
        {
          date: "Th, Oct 22",
          topic: "Back-End: Databases & ORMs",
        },
        {
          date: "Tu, Oct 27",
          topic: "Intro to Databases & Object-Relational Mappings",
          activities: [
            { title: "Intro to Databases & Object-Relational Mappings", url: "https://docs.google.com/presentation/d/1qeEZ3FX3itqv7Miuho-KqqmEvrIOBX5T/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          readings: [
            { citation: "<strong>SQL Readings</strong>: Please review the reference materials on SQL: <ul> <li><a href=\"resources/databases\">Database resources page</a></li> <li><a href=\"https://www.postgresql.org/docs/current/tutorial-select.html\" target=\"_blank\">Querying a Table</a></li> <li><a href=\"https://www.postgresql.org/docs/current/tutorial-join.html\" target=\"_blank\">Joins Between Tables</a></li> <li><a href=\"https://www.postgresql.org/docs/current/tutorial-agg.html\" target=\"_blank\">Aggregate Functions</a></li> <li><a href=\"https://www.postgresql.org/docs/current/tutorial-populate.html\" target=\"_blank\">Inserts</a></li> <li><a href=\"https://www.postgresql.org/docs/current/tutorial-update.html\" target=\"_blank\">Updates</a></li> <li><a href=\"https://www.postgresql.org/docs/current/tutorial-delete.html\" target=\"_blank\">Deletions</a></li> </ul>" },
            { citation: "<strong>Object-Relational Mapping Readings</strong>: <ul> <li><a href=\"https://martinxpn.medium.com/working-with-databases-using-asyncio-in-python-sqlalchemy-example-79-100-days-of-python-1a5cef841803\" target=\"_blank\">High-level walkthrough / overview of SQLAlchemy</a></li> <li><a href=\"https://docs.sqlalchemy.org/en/20/orm/queryguide/index.html\" target=\"_blank\">SQLAlchemy Reference</a></li> </ul>" },
          ],
        },
      ],
    },

    {
      id: 9,
      title: "Challenges in Client-Side Engineering",
      description: "In this unit, we will explore some software engineering ideas that are specific to client-side engineering. To do this, we're going to learn some HTML, CSS, JavaScript, and React concepts <em>as a means of learning</em> various client-side software engineering principles",
      meetings: [
        {
          date: "Tu, Nov 3",
          topic: "Client-Side Engineering (Part I)",
          description: "In this unit, we will explore some software engineering ideas that are specific to client-side engineering. To do this, we're going to learn some HTML, CSS, JavaScript, and React concepts <em>as a means of learning</em> various client-side software engineering principles",
          activities: [
            { title: "Client-Side Engineering (Part I)", url: "https://docs.google.com/presentation/d/1l8UaFjXBidZNg-s3j-mYWcce-4iWU2nQ/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          readings: [
            { citation: "Ask ChatGPT to answer the study questions (Be ready to have a conversation about the discussion questions, including what you learned from ChatGPT (and whether you think ChatGPT got it right).)", url: "https://chat.openai.com/" },
          ],
          optionalReadings: [
            { citation: "Design Systems", url: "/resources/design-systems" },
            { citation: "Intro to JavaScript Programming", url: "https://csci344.github.io/resources/programming-review" },
          ],
          discussionQuestions: [
            { question: "What is front-end engineering? What is UI engineering?" },
            { question: "When did it become a distinct subdiscipline of computer programming?" },
            { question: "What are some of the specific challenges that front-end engineers must navigate?" },
            { question: "What are some common technologies used in front-end engineering?" },
            { question: "What's the best way to get a job in UI engineering?" },
            { question: "Is UI engineering easier than other forms of engineering?" },
            { question: "What is functional programming?" },
            { question: "What is a bundler?" },
            { question: "What are the tradeoffs of using a client-side framework?" },
            { question: "What is the purpose of the <code>package.json</code> and <code>package-lock.json</code> files?" },
          ],
        },
        {
          date: "Th, Nov 5",
          topic: "React",
          activities: [
            { title: "React", url: "https://docs.google.com/presentation/d/1hpqJ1g0SB3JeD8rqU8u82rf9wvX-uLXW/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
          optionalReadings: [
            { citation: "React Docs: Thinking in React", url: "https://beta.reactjs.org/learn/thinking-in-react" },
            { citation: "React Docs: Describing the UI", url: "https://react.dev/learn/describing-the-ui" },
            { citation: "How A Small Team of Developers Created React at Facebook (video)", url: "https://www.youtube.com/watch?v=8pDqJVdNa44" },
          ],
        },
        {
          date: "Tu, Nov 10",
          topic: "Communicating over HTTP",
          activities: [
            { title: "Communicating over HTTP", url: "https://docs.google.com/presentation/d/1RaREuV6tA5Q1enX4qUxoCMzUIgAwEdgn/edit?usp=sharing&ouid=113376576186080604800&rtpof=true&sd=true", draft: 0 },
          ],
        },
      ],
    },

    {
      id: 10,
      title: "Back-End: Scaling Up",
      description: "",
      meetings: [
        {
          date: "Th, Nov 19",
          topic: "Introduction to Project 2",
          activities: [
            { title: "Introduction to Project 2", draft: 0 },
          ],
        },
        {
          date: "Tu, Nov 24",
          topic: "Project 2 work: Ideally, you'll begin customizing your vertical feature today",
          activities: [
            { title: "Project 2 work: Ideally, you'll begin customizing your vertical feature today", draft: 0 },
          ],
        },
      ],
    },

    {
      id: 11,
      title: "Thanksgiving Break",
      description: "",
      meetings: [
        {
          date: "Th, Nov 26",
          topic: "Thanksgiving Break",
          holiday: true,
        },
      ],
    },

    {
      id: 12,
      title: "Back-End: Scaling Up & Course Wrap",
      description: "",
      meetings: [
        {
          date: "Tu, Dec 1",
          topic: "Scaling an App",
          activities: [
            { title: "Scaling an App", url: "https://docs.google.com/presentation/d/1XUxfaWeoV7K7REbVr2kYpL5SjERiKpGe5J02BMzMTaM/edit?usp=sharing", draft: 0 },
          ],
          optionalReadings: [
            { citation: "Kubernetes Basics (Tutorial)", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" },
          ],
        },
      ],
    },

    {
      id: 13,
      title: "Final Exam",
      description: "",
      meetings: [
        {
          date: "Tu, Dec 8",
          topic: "Final Exam",
        },
      ],
    },

];
