var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var bodyParser = require("body-parser");
var request = require("request");
var postmark = require("postmark");
var nodemailer = require('nodemailer');
//var transporter = nodemailer.createTransport('smtps://'+process.env.EMAIL+'%40gmail.com:'+process.env.PASSWORD+'@smtp.gmail.com');


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//******** Adding Mentors Data ********//

//Storing Mentors as Objects in Array -- Soon to be replaced by a database

var mentorList = [
{ name:"Sharon", country:"Canada", position:"previous",  bio:"Sharon is a biology major specializing in the neurosciences at New York University Abu Dhabi. She was born in China but has called Toronto, Canada home for most of her life. Besides the neurosciences, she also has an interest in genetics, and for her senior thesis, she is researching genes conferring drug resistance in the malaria parasite in Burkina Faso. She also enjoys reading and learning languages, and has thus completed minors in literature and in French studies. At NYUAD, she serves as a peer tutor in the Writing Centre, an intern in the Dean of Students’ Office, and as a leader for several student groups including Abu Dhabi Christian Fellowship, Attitude Dance Society, and Women Empowered in STEM. She loves working with others and building community through volunteering, organizing events, and establishing friendships across cultural and linguistic boundaries. She looks forward to serving as a mentor with CAMA", image:"img/mentors/sharon.PNG"},

{name:"Maya", country:"Uganda",position:"previous", bio:"Maya is a Visual Art's Practice Major with a concentration in Social Research and Public Policy and the Environment. She is particularly interested in social, economic, and cultural environmental sustainability.", image:"img/mentors/maya.PNG"},

{name:"Luis", country:"Mexico",position:"previous", bio:"Luis Francisco studies Political Science and Arabic at New York University Abu Dhabi. He is very interested in learning languages, and talking with people about their culture and background. Even though he was born and raised in Mexico, he is interested in Arab history, politics, and language. Still, he enjoys talking about all kinds of interesting things. After graduating, Francisco plans to work in diplomacy in the region, but he is yet to see what will happen in the next years before he finishes college. He loves listening to music, playing tennis, watching a good movie, or reading interesting books.", image:"img/mentors/luis.png"},

{name:"Santina", country:"United States",position:"previous", bio:"Santina is a second-year student at New York University Abu Dhabi from the United States, majoring in Social Research and Public Policy. Her academic interests include history and psychology and learning how an understanding of contingent circumstances coupled with an understanding of characteristics of human behavior provide insight into how one can create effective public policies to address today's pressing issues. Santina also loves spending time outdoors, and with family and friends!", image:"img/mentors/santina.PNG"},

{name:"Shaqe", country:"Armenia",position:"previous", bio:"Shaqe Karapetyan is a rising sophomore from Armenia at NYUAD. She studies Physics and minors in Music and Computer Science. Her main interests are in theoretical physics. Shaqe is very much into music and performance as well as social service and volunteering. Prior to university she completed the International Bachelor program and applied to UK universities too, so she is familiar with the UCAS system as well as the Common App. Shaqe is approachable and always happy to answer any questions.", image:"img/mentors/shaqe.PNG"},


{name:"Mahrukh", country:"Pakistan",position:"previous", bio:"Mahrukh Tauseef is a Pakistani who is a rising sophomore at New York University Abu Dhabi. She is a practicing Muslim. She aims to pursue a career in Electrical Engineering. Her primary field of interest is Bio-robotics and she dreams to work on this interesting merge of biology and engineering to provide advancement in the field of medicine. Apart from academics, she loves to swim, read, write poems, listen to music, watch sitcoms, and participate in any social work opportunities. She is a member of many student interest groups on campus. She loves to travel and explore new cultures. She is friendly and funny and she loves to get to know people.", image:"img/mentors/m.PNG"},

{name:"Juria", country:"Japan",position:"previous", bio:"Juria, a sophomore at NYU Abu Dhabi, calls Japan and Nepal her home. While she spent her childhood growing up on the seashore of Chiba, she did most of her schooling in the city of Kathmandu. At NYU Abu Dhabi, she is currently studying Economics and enjoys learning topics in public policy and development. She is also an environment enthusiast and hopes to minor in Environmental Studies. Beyond academics, she is passionate about, and committed to serving the community. At NYU Abu Dhabi, she conducts various recreational and educational activities for domestic migrant workers in Abu Dhabi. In her free time, she enjoys being outdoors and always seeks to try out new adventures; traveling and exploring new cultures has been a favorite part of it. She has always had an interest in trekking in the mountains of Nepal, biking through rocky trails, climbing steep rocks, and trying out new cuisines.", image:"img/mentors/juria.PNG"},

{name:"Dhruvi", country:"Kenya",position:"previous", bio:"Dhruvi is a rising sophomore on the path to becoming a Civil Engineer at New York University Abu Dhabi. Her interest in the field stemmed from a project she was involved in while completing the IB Diploma in high school. The project focused on raising funds to build a sand dam in a rural part of her home town, Kenya.She realized her love for Science and Mathematics when she designed a learning platform to motivate young girls to study those subjects. Encouraging the youth, and especially girls to pursue Science, Technology, Engineering and Mathematics subjects has been an area of interest for her. While studying at NYUAD she was part of the weSTEM High School Girls Conference aimed at empowering young girls to take up such fields at a higher level. She believes that education is an essential tool which provides individuals with the skills to achieve their dreams.", image:"img/mentors/dhruvi.PNG"},


{name:"Alison", country:"United States",position:"previous", bio:"Alison is an electrical engineering student at NYU Abu Dhabi from California, U.S.A. She is interested in biomedical technology and robotics. In high school, she taught piano lessons to beginning students and led an Academic Decathlon competition time. Since coming to NYUAD, she has been involved in a variety of activities including vocal ensemble, volunteering at the MBZ Women's Labor Camp, and Interfaith Dialogue. Her time working as an intern for the NYU Abu Dhabi Admissions Office developed her interest in college advising and education, as she communicated regularly with prospective students and high school counselors. In her free time, she enjoys playing the piano, reading, traveling, and hiking.", image:"img/mentors/alison.PNG"},

{name:"JooHee", country:"South Korea",position:"previous", bio:"JooHee is a fourth year student at NYU Abu Dhabi. She is majoring in Biology, with a special interest in Genetics and Bioinformatics. She hopes to eventually conduct population genetics research with clinical applications to public health, as she believes a healthy body and mind are quintessential to most forms of success. Besides being a mentor at CAMA, JooHee is also a core team member of the Public Health Think Tank, an annual conference that brings together youth to develop interventions for pressing health issues in the UAE. Born in South Korea, she has also spent parts of her childhood growing up in Atlanta, Georgia. In her free time she enjoys swimming, dancing, and writing film critiques. Through CAMA, she looks forward to making meaningful connections with young individuals and providing help in the ways she can.", image:"img/mentors/joohee.png"},

{name:"Anita", country:"Czech Republic",position:"previous", bio:"Anita Duskova comes from the Czech Republic where she studied at the Johannes Kepler Grammar School in Prague. Already there she expressed her interest in debate by participating in MUN and Model European Parliament. She also took part in golf, swimming and equestrian. She continued many of these activites at NYUAD, where she became the president of the Equestrian SIG and represented the school in FinMUN. Anita's passion for debate showed in her major - Political Science and Philosophy, where she is specifically interested in Political Theorists such as Tocqueville, Weber and Friedman. Anita's further interest lies in educational policies, which is why she joined CAMA. She wants to learn about different conditions people have from different countries, in hope of finding means of equalizing conditions in access to education worldwide.", image:"img/mentors/anita.PNG"},

{name:"AhRam", country:"South Korea",position:"previous", bio:"AhRam is a rising sophomore at New York University Abu Dhabi. She is from South Korea, and graduated from CheongShim International Academy in the same country. AhRam is deciding between mathematics and economics for her major choice at university. She joined CAMA because she hoped that college application process could be a little less overwhelming and possibly enjoyable with a student mentor to talk freely to. AhRam is interested in languages, with a certain level of proficiency in several. She reads about linguistics and has won an award in the International Linguistics Olympiad. She also enjoys creative writing, grammar, vocabularies and worked as an essay tutor. Her college essays revolve around her linguistic interests and musical theater experience during high school.", image:"img/mentors/a.PNG"},


{name:"Denat", country:"Ethiopia",position:"previous", bio:"Denat E. Negatu is a rising sophomore at New York University Abu Dhabi. Although she is undecided about her major, she is interested in science, math, and economics. Experiencing different educational systems in her academic journey showed her the need and importance of the quality education for young students. Her desire to make quality education available for young students developed through teaching at humanitarian organizations and tutoring disadvantaged students in her home city Addis Ababa. In her free time, Denat enjoys dancing, playing soccer and, most importantly she loves spending time with her dogs! As a mentor in the CAMA program, she hopes to make the process of applying to universities easier for prospective freshmen and bright students.", image:"img/mentors/denat.PNG"},

{name:"Joel", country:"Rwanda",position:"previous", bio:"Joel is a civil engineering senior from Rwanda. Joel enjoys photography and socio-economic politics and development.", image:"img/mentors/joel.PNG"},

{name:"Ikenna", country:"Nigeria",position:"previous", bio:"Ikenna is a rising Junior at New York University Abu Dhabi currently majoring in Computer Engineering with a minor in Computer Science. He is interested in Artificial Intelligence/Deep Learning and being happy. Ikenna has always been passionate about knowing/learning how things work and strongly believes that education is an investment that yields the best interest. He looks forward to working with African students interested in pursuing educational opportunities outside the boundaries of their country.", image:"img/mentors/ikenna.PNG"},

{name:"Liam", country:"United States",position:"previous", bio:"Liam is a third-year student hailing from St. Louis, Missouri in the United States. At NYUAD he is majoring in Physics, but also is taking in as many philosophy courses as he can, his other passion. Committed to furthering knowledge, he has contributed to research in astrophysics, artificial intelligence, and climate change while at NYUAD. He plans on continuing to graduate school in one of these fields. When not busy at work, you can find him seeking out the best food in Abu Dhabi, on the court playing for NYUAD basketball team, or rock-climbing in the mountains.", image:"img/mentors/liam.PNG"},

{name:"Rogers", country:"Zambia",position:"previous", bio:"Rogers Iradukunda is a rising senior at New York University Abu Dhabi who is majoring in Civil Engineering. Upon completing high school, Rogers participated in the United States Students Achievers Program (USAP), a program that assists high school students from select countries to apply to US institutions of higher learning. Rogers is therefore knowledgeable about the application process associated with US colleges and universities, and would love to assist prospective freshmen embarking on a similar path to curate a worthwhile application. In his free time, Rogers loves to watch movies, listen to music, play soccer and make conversation with friends.", image:"img/mentors/rogers.PNG"},

{name:"Chiran", country:"Nepal",position:"previous", bio:"Chiran is a student from Nepal majoring in Literature and Philosophy at NYU Abu Dhabi. In his free time, he reads Gabriel Garcia Marquez, listens to rap music, and tries to write poetry. At NYUAD, he works together with young high school students in various social organizations. He wants to be a scholar and an educator in the future.", image:"img/mentors/chiran.PNG"},

{name:"Haruna", country:"Ghana",position:"previous", bio:"Haruna goes by the name Hajj Haroun, a native of Ghana – a country found in the western part of Africa and popularly known for its peaceful and hospitable citizens. Growing up in the cultures of Ghana, he has learnt the timeless virtue of living not only for oneself but for the larger society. Haruna is currently a third year student in the Humanities at NYUAD, and plans to join the workforce immediately after graduation. Haruna believes that no one is perfect. We can be great at everything but there is always someone out there that will be willing to help us work on our weaknesses. Hajj is willing to be that one person.", image:"img/mentors/haruna.PNG"},

{name:"Jessica", country:"Nigeria",position:"previous", bio:"Jessica is a junior majoring in Social Research and Public Policy with a minor in Economics. She developed a passion for helping young people achieve their dreams when she worked with students at Brainfield Schools, Nigeria. As a freshman at NYUAD, she was a co-facilitator of Girls' Education Network. Jessica is grateful for an opportunity of studying abroad and wants to give back by guiding high school students. She is currently a Resident Assistant (RA) at NYUAD and has also gained experience by working with the NYUAD office of Public Affairs and NYUAD Career Development Center. Jessica is keen on becoming a consultant and has stepped onto her career path with internships at Select Training and Management Consultancy (UAE) as well as South African Renewable Energy Business Incubator (South Africa).", image:"img/mentors/jessica.PNG"}


];


var executiveBoardList = [
  {name:"Cynthia", country:"Rwanda",responsibility:"President", position:"advisory", bio:"Cynthia Mulindi is a junior student at New York University Abu Dhabi, where she is majoring in Economics with a concentration in Finance and Psychology. Cynthia has taken diverse courses in disciplines such as theatre, music, business and marketing. While studying at NYUAD, she has been involved in the Abu Dhabi community by volunteering at The Future Center for Special Needs, the Filipino Safe House and the Women’s Labor Camp. She believes that the key to eradication of poverty is education, as a good education allows people to acquire the skills they need in order to develop. Thus, being part of CAMA and working with a very passionate team is a chance for her to share her experience and help others attain such an education. In 2015, she interned with the education department at the Rwandan embassy in Washington DC, where she acted as a liaison between the department and Rwandan students in the US. She initiated a program that will help collect the student’s contacts and locations, to ensure that the embassy is able to more easily support them during their study abroad. Cynthia is also interested in learning more about mental health, particularly how culture-specific coping mechanisms may create resiliency and their impact on the recovery time from traumatic events such as war and genocide" ,image:"img/executive/Cynthia.PNG"},

  {name:"Sofia", country:"United States",responsibility:"Director of Evaluation & Program Development", position:"advisory",  bio:"Sofia, a theater and political science major at NYU Abu Dhabi, is a passionate dancer and yogi and a firm believer in the transformative power of education. In 2011, she departed Chicago, IL to complete her final two years of high school at the Waterford Kamhlaba United World College of Southern Africa (UWCSA). Her experience in Swaziland invigorated her passion for education and service, and showed her the value of bringing together diverse individuals. At NYU Abu Dhabi, Sofia has served as the Officer of Communications in Student Government and interned with both the Office of Spiritual Life and Intercultural Education and the Office of Community Outreach. In 2015, Sofia received the Dalai Lama Fellowship and co-founded the Girls’ Education Network, a leadership development program for young girls. She has also studied and spent time in Kampala and Accra. In the future, she aims to serve at the intersection of education and equity and explore how meaningful dialogue can serve as a powerful catalyst for individual and community learning.", image:"img/executive/Sofia.PNG"},

  {name:"Vongai", country:"Zimbabwe", responsibility:"Director of Curriculum Development", position:"advisory", bio:"Vongai is a Biology major on a Pre-Medical Track at New York University Abu Dhabi. Her love of life sciences and her extracurricular interests intersect around a common theme: education. She believes that education is a force that can empower and produce long-lasting change. She has worked in a broad range of settings that have affirmed this belief; from a volunteer pre-school teacher in the Philippines to a facilitator in a Leadership Development Series for young girls in Abu Dhabi. In these experiences, she enjoyed being able to help others develop the tools they need to cultivate their own dreams and aspirations. She recognizes that her passion to be involved in education was fostered by the wonderful mentors she had as a teenager which is why CAMA is a personal project for her and a way in which she can give back to other African students who may be facing barriers in their academic trajectory. In her free time, Vongai enjoys composing poetry and short stories, running and having a good debate about almost anything.", image:"img/executive/Vongai2.PNG"},

  {name:"Pearl", country:"Zimbabwe",responsibility:"Director of Web Development, Outreach & Engagement", position:"advisory", bio:"Pearl is a Computer Engineering student at New York University Abu Dhabi. He has a strong passion for programming and facilitating intercultural communication. Pearl believes the major key to positive change in society is the education of young people. To teach young people to think independently and innovatively, and for them to overcome the differences in each other’s religions, ethnic backgrounds and traditions. In 2013, Pearl worked as a facilitator with Lead Us Today, an organization that provides leadership and entrepreneurial training to high school students in Bulawayo, Zimbabwe. At NYUAD,he has worked with the Office of Spiritual Life and Intercultural Education as a Sustained Dialogue Ambassador.", image:"img/executive/Pearl.jpg"},

  {name:"Gladys", country:"Zimbabwe", responsibility:"Director of Admissions", position:"advisory", bio:"ladys Tarisai Mwedzi is a young 19 year old girl from the second capital of Zimbabwe, Bulawayo. She is an aspiring Aerospace Engineer and her dream to someday work at NASA is being cultivated at NYU Abu Dhabi where she is currently pursuing a bachelors degree in Mechanical Engineering. She is most passionate about giving back in any way she can. The girl child is most dear to her and she is currently heading two charity organizations from Bulawayo which help raise funding for students to stay in school and help empower  the girl child respectively. She is a huge fan of EDM, music is life for her and dancing makes her happy. To be part of CAMA for her means that she gets the opportunity to help make another African student's dream a reality, something that someone helped her do when she applied and got accepted to NYUAD", image:"img/executive/Gladys2.PNG"},

  {name:"Touba", country:"The Gambia",responsibility:"Director of Communications", position:"advisory", bio:"Touba is doing a Mathematics major and an Economics minor at NYU Abu Dhabi. His love for financial engineering is the motivation behind his BS in Mathematics. Touba has some experience in a range of career work, from NYUAD Political Science Department, the Gambia Bureau of Statistics, to Brightstone Middle East. More so, Touba Marrie believes in learning new things and to him, one can learn anytime, anywhere. As a result, he is both inquisitive and creative. He is also a youth advocator. He is an active member of National child and Youth Advisory Board. In 2011, he participated in a summer camp called Child Fund International organized by the Youth Ambassadors of Peace in The Gambia. At the camp he learnt about peace and conflict management, drug awareness and crime resistance. Marrie has been a peer health educator too. He never relents in his efforts to educate his colleagues about the effects of teenage pregnancy, early marriage, HIV and AIDS, and Malaria. He has indeed helped change the lives of many. Being part of an initiative that aims to help young people has always been Touba's dream. College has been a wonderful experience for him and he would like to share this experience with the many who could learn from it.", image:"img/executive/Touba2.PNG"},

  {name:"Sekou", country:"Liberia",responsibility:"President", position:"executive", bio:"Sekou M Jabateh is an Economics and Political Science major at NYU Abu Dhabi. He is interested in psychology and exploring different academic disciplines, cultures, and environments. A fervent proponent of Africa’s reform through education, entrepreneurship, and ethical leadership, he is committed to creating opportunities for young people to aspire and achieve their goals. He believes education will empower them to lead change on the continent. Sekou was the valedictorian of his high school and a change-leader at SMART Liberia, a non-profit supporting education in Liberia. In 2016, he became a Yale Young African Scholar and subsequently served as an ambassador and mentor of the program. In addition, he was a leader of Pen In a Box, an international, student-run organization helping to increase global access to education for children. At NYU Abu Dhabi, he facilitates for the Boys Education Network(BEN), a leadership development program for middle and high school boys. Sekou is driven by passion and commitment to service. He envisions a world where every child has access to education, opportunities, and empowerment, and can contribute meaningfully to society.", image:"img/executive/Sekou.JPG"},


  {name:"Nawal", country:"Kenya",responsibility:"Director of Communications", position:"executive", bio:" Nawal is a first year student at NYUAD. She is majoring in Social Research and Public Policy with a minor in Arabic and African Studies. A Kenyan citizen, Nawal is passionate about issues facing the African continent and is keen on working in policy making in the coming years. She is currently serving as secretary of Africa Global, a Student Interest Group in NYUAD for African students from the continent and the diaspora. Having been through the Kenyan education system coupled with an IB scholarship to Singapore, Nawal has experience in these two systems and how they worked to prepare her for her time at NYUAD. She is also interested in sustainability issues and is a member of Green House, a Student think tank aimed at finding solutions to climate change. In her free time, Nawal enjoys spending a good evening with friends to unwind and try out new cuisines.", image:"img/executive/Nawal.JPG"},

  {name:"Alison", country:"United States",responsibility:"Director of Curriculum Development", position:"executive", bio:"Alison Waterman is a second-year student electrical engineering student at NYU Abu Dhabi, from Sacramento, California. She is interested in robotics, biomedical technology, and aerospace science. While at NYU Abu Dhabi, she has been involved in several community initiatives, including an urban development project related to solar power in Mumbai, India, with the Engineers for Social Impact program. She also participated in a January Term class in Accra, Ghana, where she studied sociopolitical factors that lead to wealth inequality. Her time working as an intern for the NYU Abu Dhabi Admissions Office developed her interest in college advising and education, as she communicated regularly with prospective students and high school counselors. She is passionate about making the college application process more transparent and accessible to students throughout the world. In her free time, she enjoys playing the piano, reading science fiction novels, traveling, and participating in outdoor activities such as hiking and kayaking.", image:"img/executive/Alison.JPG"},

  {name:"Patrick", country:"Rwanda",responsibility:"Director of Website Development", position:"executive", bio:"Patrick is a student at New York University Abu Dhabi, pursuing a major in Computer Science with a minor in Sound and Music Computing. Patrick has a great passion in education, as he is involved in IT educational programs in Rwanda with klab. During his free time he enjoys catching up with friends and watching movies.", image:"img/executive/Patrick.JPG"},

  {name:"Shaima", country:"Sudan",responsibility:"Director of Admissions", position:"executive", bio:"Shaima Abdalla Ahmed is pursuing a double major in Economics and Political Science. She lived her entire life in Khartoum, Sudan, and has spent the last few years of high school focusing on educational programmes, for girls and for university students. Her experience in Sudan has furthered her passion for providing opportunities and facilitating resources to allow students to attain the education that she was fortunate enough to have. CAMA allows Shaima to be able to achieve those goals and help her fellow African students achieve theirs! Shaima has always been a proud member of the MUN society throughout high school and supported the local poetry scene in her hometown.", image:"img/executive/Shaima.JPG"},

  {name:"Edie", country:"China",responsibility:"Director of Program Development", position:"executive", bio:"Edie is a sophomore in New York University Abu Dhabi majoring in Theatre. She has been practicing ballet and hip-hop for 15 years. She loves sports like Scuba diving. Passionate about empowering women and helping develop education availability, She has served as the Student Performing Arts Director in International Women’s Academy for 5 years. She hopes to bring her expertise in remote mentorship to CAMA. Please do not hesitate to ask any question about College application.", image:"img/executive/Edie.jpg"}
];


var subscribedMembers = [];

//******** Adding Mentors Data ********//

//*** Routes ***//

app.get("/.well-known/acme-challenge/OWQm-G4zUTKePMuk6tI2hNz7XHZpHu5OdDwMuXK4TDA", function(req, res){

  res.send("OWQm-G4zUTKePMuk6tI2hNz7XHZpHu5OdDwMuXK4TDA.3Q9rf6ahUvRSbZB_QpuJChg8_zbLjUkXUwLGjOFvpik");

});


// Going to Index Page (Landing page)
app.get("/", function(req, res){
  res.render("index",{mentorList:mentorList});


});

// Going to Resouces
app.get("/resources", function(req, res){
  res.render("resources");
});


//Going to Executive Members
app.get("/executives", function(req, res){
  res.render("executive-team", {executiveBoardList:executiveBoardList});
});
app.get("/executive", function(req, res){
  res.render("eboardexecutive-team", {executiveBoardList:executiveBoardList});
});
app.get("/advisory", function(req, res){
  res.render("advisoryexecutive-team", {executiveBoardList:executiveBoardList});
});


//Going to Mentors
app.get("/mentors", function(req, res){
  res.render("mentors", {mentorList:mentorList});
});

app.get("/mentors/current", function(){
  res.render("currentMentors");
});

app.get("/mentors/previous", function(){
  res.render("previousMentors");
});

//End of Mentors //


//Going To Join Cama Comunity
app.get("/join", function(req, res){
  res.render("join");
});

//Going to Mentee Contract
app.get("/menteeContract",function(req, res){
 res.render("menteeContract.ejs")
});

//Going to Mentor Contract
app.get("/mentorContract",function(req, res){
 res.render("mentorContract.ejs")
});

/*
//Going to MENTEES
app.get("/mentees", function(req, res){
  res.render("mentees");
});

app.get("/mentees/current", function(req, res){
  res.render("currentMentees");
});

app.get("/mentees/previous", function(req, res){
  res.render("previousMentees");
});
*/

app.get("/contactus", function(req, res){
  res.render("contact-us");
});

app.get("/application", function(req, res){
  res.render("mentessApplicationForm");
});



//*** End of Routes ***//



//***** To get Email Information from Subscription ****//
app.post("/subscribed", function(req, res){


//**** Adding Email To MAIL Chimp ****//

var options = { method: 'POST',
  url: 'https://us18.api.mailchimp.com/3.0/lists/'+process.env.LISTID+'/members',
  headers:
   { 'Postman-Token': process.env.POSTMANTOKEN,
     'Cache-Control': 'no-cache',
     Authorization: process.env.AUTORIZATION+'=',
     'Content-Type': 'application/json' },
  body: { email_address: req.body.email, status: 'subscribed' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

res.redirect("/");

});

//Deploying Server

app.listen(process.env.PORT || 3001, function(req, res){
  console.log("Server Up and Running at 3001");
});
