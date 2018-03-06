$(document).ready(function() {

   
    $('.game').hide();
    $('.results').hide();
    
    
    var correct;
    var wrong;
    var answer;
    var counter;
    var count;
    var timeout;
    var i = 0;
  
    var activeQuestion = {
      question: "",
      answer: '',
      choices: [],
    }
  
    
    var questions = {
  
    };
  
    var questionInfo = {
      q1: {
        question: "What is the tallest building in the World as of 2018?",
        answer: 'Jeddah Tower',
        choices: ['Global Financial Center Tower 1', 'Jeddah Tower', 'Berj Khalifa', 'Wuhan Greenland Center',],
      },
      q2: {
        question: "What is the world's biggest Island?",
        answer: 'Greenland',
        choices: ['Hawaii', 'Galapagos Island','Fiji','Greeland'],
      },
      q3: {
        question: "This Mixed Martial Arts is native to the country Brazil:",
        answer: 'Capoeira',
        choices: ['Tae-Kwan-Do','Jiu-jitsu','Krav Maga','Capoeira'],
      },
      q4: {
        question: "Who is considered the most successful rap artist of all time?",
        answer: 'Jay-Z',
        choices: ['Jay-Z','Tupac','Drake','Eminem'],
      },
      q5: {
        question: "What is James Mercer's side project?",
        answer: 'Broken Bells',
        choices: ['Modest Mouse','Grizzly Bear','Broken Bells','The Shins'],
      },
      q6: {
        question: "What big time actor is from Neptune, NJ?",
        answer: 'Jack Nicholson',
        choices: ['Jack Nicholson','Arnold Schwarzenegger','Brad Pitt','Kevin Spacey'],
      },
      q7: {
        question: "What year was electricity invented?",
        answer: '1759',
        choices: ['2000','1759','1866','1455'],
      },
      q8: {
        question: "What is the official language of Israel?",
        answer: 'English',
        choices: ['Spanish','Hebrew','English','Swahili'],
      },

    };
  
  
  
  
    var questionTimer = {
      
      time: 15,
      reset: function(t) {
        questionTimer.time = t;
        $('.timeLeft').html('Time Left: ' + questionTimer.time);
      },
      gameTimeout: function(){
        timeout = setTimeout(questionTimer.timeUp, 1000*15);
      },
      count: function() {
        $('.timeLeft').html('Time Left: ' +questionTimer.time);
        questionTimer.time--;
      },
      countDown: function(){
        counter = setInterval(questionTimer.count,1000);
      },
      stopTimer: function(){
        clearInterval(counter);
      },
      timeUp: function(){
        wrong++;
        questionTimer.reset(5)
        $('.answers').html('<h2>WRONG! The answer is ' + activeQuestion.answer + ' </h2>');
        setTimeout(game, 5000);
      },
    };
  
    
    function gameOver() {
      if (Object.keys(questions).length === 0) {
        questionTimer.stopTimer();
        $('.game').hide();
        $('.results').show();
        $('.correct').html('Number Correct: ' + correct);
        $('.wrong').html('Number Incorrect: ' + wrong);
        activeQuestion = false;
      };
    };
  
    
    function answerCheck() {
      if (answer == activeQuestion.answer && questionTimer.time > 0) {
        correct++;
        questionTimer.reset(5);
        $('.answers').html('<h2>Correct! The answer is ' + activeQuestion.answer + ' </h2>');
        setTimeout(game, 5000);   
      }
        
      if (answer != activeQuestion.answer){
        questionTimer.timeUp();
      }
    }
  
     
    function randomize() {
      activeQuestion.choices.sort(function() { 
        return 0.5 - Math.random(); 
      });
    };
  
    
    function game(){
  
      
      gameOver();
  
      
      if (Object.keys(questions).length > 0) {
  
        
        var keys = Object.keys(questions);
        var objIndex = keys[ keys.length * Math.random() << 0];
        activeQuestion = questions[objIndex];
  
        
        randomize();
  
        
        delete questions[objIndex];
  
        $('.answers').empty();
  
        questionTimer.stopTimer();
        questionTimer.reset(15);
        questionTimer.gameTimeout()
  
        
        questionTimer.countDown();
  
        $('.question').html(activeQuestion.question);
        
        i=0;
        
        $(activeQuestion.choices).each(function() {
        $('.answers').append('<button class="btn btn-lg option text-center">' + activeQuestion.choices[i] + '</button>');
        i++;
        });
      }; 
  
      $('.option').on('click', function(){
          answer = $(this).html();
          answerCheck();
          clearTimeout(timeout);
        });
  
      
    };
  
  
    $('.start').on('click',function(){
      $('.results').hide();
      questions = questionInfo;
      correct = 0;
      wrong = 0;
      game();
      $('.game').show();
    });
      
  
  
  });