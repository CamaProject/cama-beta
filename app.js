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
{ name:"Sharon", country:"Canada", position:"previous",  bio:"Sharon is a biology major specializing in the neurosciences at New York University Abu Dhabi. She was born in China but has called Toronto, Canada home for most of her life. Besides the neurosciences, she also has an interest in genetics, and for her senior thesis, she is researching genes conferring drug resistance in the malaria parasite in Burkina Faso. She also enjoys reading and learning languages, and has thus completed minors in literature and in French studies. At NYUAD, she serves as a peer tutor in the Writing Centre, an intern in the Dean of Students’ Office, and as a leader for several student groups including Abu Dhabi Christian Fellowship, Attitude Dance Society, and Women Empowered in STEM. She loves working with others and building community through volunteering, organizing events, and establishing friendships across cultural and linguistic boundaries. She looks forward to serving as a mentor with CAMA", image:"img/mentors/previousMentors/sharon.PNG"},

{name:"Maya", country:"Uganda",position:"previous", bio:"Maya is a Visual Art's Practice Major with a concentration in Social Research and Public Policy and the Environment. She is particularly interested in social, economic, and cultural environmental sustainability.", image:"img/mentors/previousMentors/maya.PNG"},

{name:"Luis", country:"Mexico",position:"previous", bio:"Luis Francisco studies Political Science and Arabic at New York University Abu Dhabi. He is very interested in learning languages, and talking with people about their culture and background. Even though he was born and raised in Mexico, he is interested in Arab history, politics, and language. Still, he enjoys talking about all kinds of interesting things. After graduating, Francisco plans to work in diplomacy in the region, but he is yet to see what will happen in the next years before he finishes college. He loves listening to music, playing tennis, watching a good movie, or reading interesting books.", image:"img/mentors/previousMentors/luis.png"},

{name:"Santina", country:"United States",position:"previous", bio:"Santina is a second-year student at New York University Abu Dhabi from the United States, majoring in Social Research and Public Policy. Her academic interests include history and psychology and learning how an understanding of contingent circumstances coupled with an understanding of characteristics of human behavior provide insight into how one can create effective public policies to address today's pressing issues. Santina also loves spending time outdoors, and with family and friends!", image:"img/mentors/previousMentors/santina.PNG"},

{name:"Shaqe", country:"Armenia",position:"previous", bio:"Shaqe Karapetyan is a rising sophomore from Armenia at NYUAD. She studies Physics and minors in Music and Computer Science. Her main interests are in theoretical physics. Shaqe is very much into music and performance as well as social service and volunteering. Prior to university she completed the International Bachelor program and applied to UK universities too, so she is familiar with the UCAS system as well as the Common App. Shaqe is approachable and always happy to answer any questions.", image:"img/mentors/previousMentors/shaqe.PNG"},


{name:"Mahrukh", country:"Pakistan",position:"previous", bio:"Mahrukh Tauseef is a Pakistani who is a rising sophomore at New York University Abu Dhabi. She is a practicing Muslim. She aims to pursue a career in Electrical Engineering. Her primary field of interest is Bio-robotics and she dreams to work on this interesting merge of biology and engineering to provide advancement in the field of medicine. Apart from academics, she loves to swim, read, write poems, listen to music, watch sitcoms, and participate in any social work opportunities. She is a member of many student interest groups on campus. She loves to travel and explore new cultures. She is friendly and funny and she loves to get to know people.", image:"img/mentors/previousMentors/m.PNG"},

{name:"Juria", country:"Japan",position:"previous", bio:"Juria, a sophomore at NYU Abu Dhabi, calls Japan and Nepal her home. While she spent her childhood growing up on the seashore of Chiba, she did most of her schooling in the city of Kathmandu. At NYU Abu Dhabi, she is currently studying Economics and enjoys learning topics in public policy and development. She is also an environment enthusiast and hopes to minor in Environmental Studies. Beyond academics, she is passionate about, and committed to serving the community. At NYU Abu Dhabi, she conducts various recreational and educational activities for domestic migrant workers in Abu Dhabi. In her free time, she enjoys being outdoors and always seeks to try out new adventures; traveling and exploring new cultures has been a favorite part of it. She has always had an interest in trekking in the mountains of Nepal, biking through rocky trails, climbing steep rocks, and trying out new cuisines.", image:"img/mentors/previousMentors/juria.PNG"},

{name:"Dhruvi", country:"Kenya",position:"previous", bio:"Dhruvi is a rising sophomore on the path to becoming a Civil Engineer at New York University Abu Dhabi. Her interest in the field stemmed from a project she was involved in while completing the IB Diploma in high school. The project focused on raising funds to build a sand dam in a rural part of her home town, Kenya.She realized her love for Science and Mathematics when she designed a learning platform to motivate young girls to study those subjects. Encouraging the youth, and especially girls to pursue Science, Technology, Engineering and Mathematics subjects has been an area of interest for her. While studying at NYUAD she was part of the weSTEM High School Girls Conference aimed at empowering young girls to take up such fields at a higher level. She believes that education is an essential tool which provides individuals with the skills to achieve their dreams.", image:"img/mentors/previousMentors/dhruvi.PNG"},


{name:"Alison", country:"United States",position:"previous", bio:"Alison is an electrical engineering student at NYU Abu Dhabi from California, U.S.A. She is interested in biomedical technology and robotics. In high school, she taught piano lessons to beginning students and led an Academic Decathlon competition time. Since coming to NYUAD, she has been involved in a variety of activities including vocal ensemble, volunteering at the MBZ Women's Labor Camp, and Interfaith Dialogue. Her time working as an intern for the NYU Abu Dhabi Admissions Office developed her interest in college advising and education, as she communicated regularly with prospective students and high school counselors. In her free time, she enjoys playing the piano, reading, traveling, and hiking.", image:"img/mentors/previousMentors/alison.PNG"},

{name:"JooHee", country:"South Korea",position:"previous", bio:"JooHee is a fourth year student at NYU Abu Dhabi. She is majoring in Biology, with a special interest in Genetics and Bioinformatics. She hopes to eventually conduct population genetics research with clinical applications to public health, as she believes a healthy body and mind are quintessential to most forms of success. Besides being a mentor at CAMA, JooHee is also a core team member of the Public Health Think Tank, an annual conference that brings together youth to develop interventions for pressing health issues in the UAE. Born in South Korea, she has also spent parts of her childhood growing up in Atlanta, Georgia. In her free time she enjoys swimming, dancing, and writing film critiques. Through CAMA, she looks forward to making meaningful connections with young individuals and providing help in the ways she can.", image:"img/mentors/previousMentors/joohee.png"},

{name:"Anita", country:"Czech Republic",position:"previous", bio:"Anita Duskova comes from the Czech Republic where she studied at the Johannes Kepler Grammar School in Prague. Already there she expressed her interest in debate by participating in MUN and Model European Parliament. She also took part in golf, swimming and equestrian. She continued many of these activites at NYUAD, where she became the president of the Equestrian SIG and represented the school in FinMUN. Anita's passion for debate showed in her major - Political Science and Philosophy, where she is specifically interested in Political Theorists such as Tocqueville, Weber and Friedman. Anita's further interest lies in educational policies, which is why she joined CAMA. She wants to learn about different conditions people have from different countries, in hope of finding means of equalizing conditions in access to education worldwide.", image:"img/mentors/previousMentors/anita.PNG"},

{name:"AhRam", country:"South Korea",position:"previous", bio:"AhRam is a rising sophomore at New York University Abu Dhabi. She is from South Korea, and graduated from CheongShim International Academy in the same country. AhRam is deciding between mathematics and economics for her major choice at university. She joined CAMA because she hoped that college application process could be a little less overwhelming and possibly enjoyable with a student mentor to talk freely to. AhRam is interested in languages, with a certain level of proficiency in several. She reads about linguistics and has won an award in the International Linguistics Olympiad. She also enjoys creative writing, grammar, vocabularies and worked as an essay tutor. Her college essays revolve around her linguistic interests and musical theater experience during high school.", image:"img/mentors/previousMentors/a.PNG"},


{name:"Denat", country:"Ethiopia",position:"previous", bio:"Denat E. Negatu is a rising sophomore at New York University Abu Dhabi. Although she is undecided about her major, she is interested in science, math, and economics. Experiencing different educational systems in her academic journey showed her the need and importance of the quality education for young students. Her desire to make quality education available for young students developed through teaching at humanitarian organizations and tutoring disadvantaged students in her home city Addis Ababa. In her free time, Denat enjoys dancing, playing soccer and, most importantly she loves spending time with her dogs! As a mentor in the CAMA program, she hopes to make the process of applying to universities easier for prospective freshmen and bright students.", image:"img/mentors/previousMentors/denat.PNG"},

{name:"Joel", country:"Rwanda",position:"previous", bio:"Joel is a civil engineering senior from Rwanda. Joel enjoys photography and socio-economic politics and development.", image:"img/mentors/previousMentors/joel.PNG"},

{name:"Ikenna", country:"Nigeria",position:"previous", bio:"Ikenna is a rising Junior at New York University Abu Dhabi currently majoring in Computer Engineering with a minor in Computer Science. He is interested in Artificial Intelligence/Deep Learning and being happy. Ikenna has always been passionate about knowing/learning how things work and strongly believes that education is an investment that yields the best interest. He looks forward to working with African students interested in pursuing educational opportunities outside the boundaries of their country.", image:"img/mentors/previousMentors/ikenna.PNG"},

{name:"Liam", country:"United States",position:"previous", bio:"Liam is a third-year student hailing from St. Louis, Missouri in the United States. At NYUAD he is majoring in Physics, but also is taking in as many philosophy courses as he can, his other passion. Committed to furthering knowledge, he has contributed to research in astrophysics, artificial intelligence, and climate change while at NYUAD. He plans on continuing to graduate school in one of these fields. When not busy at work, you can find him seeking out the best food in Abu Dhabi, on the court playing for NYUAD basketball team, or rock-climbing in the mountains.", image:"img/mentors/previousMentors/liam.PNG"},

{name:"Rogers", country:"Zambia",position:"previous", bio:"Rogers Iradukunda is a rising senior at New York University Abu Dhabi who is majoring in Civil Engineering. Upon completing high school, Rogers participated in the United States Students Achievers Program (USAP), a program that assists high school students from select countries to apply to US institutions of higher learning. Rogers is therefore knowledgeable about the application process associated with US colleges and universities, and would love to assist prospective freshmen embarking on a similar path to curate a worthwhile application. In his free time, Rogers loves to watch movies, listen to music, play soccer and make conversation with friends.", image:"img/mentors/previousMentors/rogers.PNG"},

{name:"Chiran", country:"Nepal",position:"previous", bio:"Chiran is a student from Nepal majoring in Literature and Philosophy at NYU Abu Dhabi. In his free time, he reads Gabriel Garcia Marquez, listens to rap music, and tries to write poetry. At NYUAD, he works together with young high school students in various social organizations. He wants to be a scholar and an educator in the future.", image:"img/mentors/previousMentors/chiran.PNG"},

{name:"Haruna", country:"Ghana",position:"previous", bio:"Haruna goes by the name Hajj Haroun, a native of Ghana – a country found in the western part of Africa and popularly known for its peaceful and hospitable citizens. Growing up in the cultures of Ghana, he has learnt the timeless virtue of living not only for oneself but for the larger society. Haruna is currently a third year student in the Humanities at NYUAD, and plans to join the workforce immediately after graduation. Haruna believes that no one is perfect. We can be great at everything but there is always someone out there that will be willing to help us work on our weaknesses. Hajj is willing to be that one person.", image:"img/mentors/previousMentors/haruna.PNG"},

{name:"Jessica", country:"Nigeria",position:"previous", bio:"Jessica is a junior majoring in Social Research and Public Policy with a minor in Economics. She developed a passion for helping young people achieve their dreams when she worked with students at Brainfield Schools, Nigeria. As a freshman at NYUAD, she was a co-facilitator of Girls' Education Network. Jessica is grateful for an opportunity of studying abroad and wants to give back by guiding high school students. She is currently a Resident Assistant (RA) at NYUAD and has also gained experience by working with the NYUAD office of Public Affairs and NYUAD Career Development Center. Jessica is keen on becoming a consultant and has stepped onto her career path with internships at Select Training and Management Consultancy (UAE) as well as South African Renewable Energy Business Incubator (South Africa).", image:"img/mentors/previousMentors/jessica.PNG"},


//CURRENT Mentors

{name:"Saif", country:"United Arab Emirates",position:"current", bio:"Saif Almehairi is an Emirati who has lived most of his life in Abu Dhabi, the capital of the United Arab Emirates. He attended Abu Dhabi International Private School as an Advanced American curriculum candidate. He is currently a sophomore at New York University Abu Dhabi pursuing a major in Economics and a double minor in Applied Mathematics and Political Science. Regarding his academic interests, he enjoys studying all of the social sciences as he believes they serve as a bridge between the humanities and the sciences. Outside the classroom, Saif enjoys playing football and traveling. He played in several football clubs, including his high school football team, where he served as captain for most of his playing career. In addition, he has volunteered in those clubs to serve as a coach for the younger players (aged 5-9). Saif is extremely excited to take on this new volunteering opportunity as he believes that his college application process and extensive understanding of the system will serve as an invaluable asset for his assigned mentee/s. He hopes that his mentee/s is excited as he is!", image:"img/mentors/currentMentors/saif.jpg"},

/*
{name:"Amina", country:"Bosnia",position:"current", bio:"Amina comes from a small heart-shaped land called Bosnia and Herzegovina. She is majoring in Social Research and Public Policy and plans to specialize in Public Health and Anthropology. As someone who comes from a less developed country, education has always been immensely important to her as it has truly been a transformational element in her life. And that is exactly why she wants to contribute and help others in their journey. Throughout her experience, she has been involved in many organizations. She has previously volunteered in SOS Kindergarten as an English language tutor. At NYUAD, she is engaged in Girls Education Network, where she facilitates weekly workshops for young girls from Abu Dhabi. As evidenced by her commitment to service, she finds particular pleasure in doing community work and working with children. She believes this has shaped her into who she is today and constitutes a big part of her identity. She enjoys working with others and being in contact with people because she gets a chance to learn and help others!",image:""},
*/

/*
{name:"Atoka Jo", country:"Japan",position:"current", bio:"Atoka Jo is a junior at New York University Abu Dhabi, majoring in Social Research and Public Policy, and minoring in Theater and Interactive Media. Because of her passion in education, she created a summer school for Japanese middle school students to promote active-style and English-based learning in Japan. In Abu Dhabi, she was a facilitator in Girls Education Network, where she helped organize workshops for young girls in Abu Dhabi. In Buenos Aires, she tutored English and Math for children of low-income families and in Accra, she taught Japanese culture, English, and Math at a local Ghanaian public school. She also advocated for education for all during her internship at the United Nations in New York. She hopes to meet courageous young Africans and bring the best out of her mentees through CAMA.", image:""},
*/

{name:"Munib", country:"Bosnia",position:"current", bio:"Munib Mešinović comes from Travnik, a small town in the middle of Bosnia and Herzegovina, isolated from many kinds of “international” education except the one so many take for granted: the Internet. Through this multifaceted tool, Munib has been able to inform himself of and partake in many opportunities such as volunteering with DEAF (Federal Organization of the Hearing Impaired), absorbing educational materials such as books and videos, as well as applying to colleges such as New York University Abu Dhabi, which he now calls home. In addition to surfing on the Internet for valuable information, Munib spends most of his time reading, swimming, and hiking. However, a particular passion of his has been tutoring and teaching. As a CAMA mentor, he wants to combine this interest with the aforementioned potential of the internet in the hopes of guiding students who are as eager to learn as he is. Munib is currently studying Electrical Engineering and working on a project for the iGEM Bioengineering Competition, in which he is helping to build a cheap, fast, and reliable food-pathogen detection device.", image:"img/mentors/currentMentors/MunibMesinovic.jpg"},

/*
{name:"Otelo", country:"USA",position:"current", bio:"Otelo Reggy-Beane is a U.S. American second-year student at New York University Abu Dhabi interested in the intersection of community and infrastructure in our cities. He is majoring in Social Research and Public Policy with a minor in Civil Engineering to better understand sustainable and inclusive urban development. His passion for public service inspired him to find opportunities to grow as an advocate of change. Otelo’s focus on urbanization began during a summer internship with a Portland city commissioner where he conducted policy research on affordable housing. He learned about the inequalities affecting many communities of color as well as the importance of equitable representation and participation in government. Since then, Otelo has worked for politicians on both ends of the American ideological spectrum, including the Mayor of Portland, Oregon and the Governor of Utah. When he is not traveling, Otelo enjoys playing basketball, watching binge-worthy Netflix Originals and building his Kenya-based social enterprise, Umoja Beads. In the future, Otelo aspires to be an elected official advocating for and empowering underprivileged communities around the world. Otelo believes higher education has been excellent for his exploration and growth and looks forward to leading students to their full academic potential.", image:""},
*/

{name:"Maitha", country:"United Arab Emirates",position:"current", bio:"Maitha AlSuwaidi is a political science student at New York University Abu Dhabi (NYUAD). Other than her passion for politics, she also enjoys reading and writing articles, as she writes for Sail E-Magazine. She is evidently passionate about cultural engagement, having interned in the Cultural Engagement Program in NYUAD. She also possesses an undeniable passion for the arts, as she has been actively creating art in addition to interning in NYUAD’s Art Gallery. Having volunteered in an international competition for people with disabilities and participated in the World Travel Market conference representing the UAE alongside many others, Maitha values being an active part of the larger community, by contributing to that community and also benefiting from it through the unique relationships she makes. She views and represents herself as an advocate for mental health awareness, cultural diversity and engagement, and disability activism.", image:"img/mentors/currentMentors/maitha.jpeg"},


/*
{name:"Amna", country:"United Arab Emirates",position:"current", bio:"Amna is a Sophomore from the United Arab Emirates at New York University Abu Dhabi. She is majoring in Political Science and Art History with a concentration in Legal Studies. Amna enjoys intercultural conversations, music, and art. By the time she graduates, she hopes to gain a better understanding of regional and international politics, the role of culture in the arts, and above all, the UAE’s position in the realm of international relations. After NYUAD, she wishes to continue studying political science and diplomacy, and find a career that will combine her passion for politics, arts, and cultural diversity. Amna also enjoys quiet mornings with a good cup of coffee and an engaging book as well as thought-provoking conversations with her friends.", image:""},
*/

/*
{name:"Aya", country:"Morocco",position:"current", bio:"Aya Bouhelal is a sophomore at New York University Abu Dhabi who intends to double major in philosophy and psychology.  Before attending college, she graduated from a Moroccan high school in which she pursued a mostly scientific path. Being aware of how unfamiliar students from the MENA region are with the application process, she made herself available to answer any worries or questions they might have. Over her high school and her freshman years, Aya has often taken part in volunteering programs through which she aimed to share her energy and her knowledge. From assisting the mentally disabled to offering SAT classes to her younger peers, her experience enabled her to meet different people with different needs.  Most of Aya’s hobbies are related to Art.  Aya does photography, in both personal and professional settings. She is also passionate about music. She plays the guitar and recently took up the clarinet.", image:""},
*/

{name:"Nadia", country:"USA",position:"current", bio:"Nadia Hussein is a second-year student at New York University Abu Dhabi majoring in Political Science with minors in Legal Studies and Arabic. She is first-generation American of Indian-Guyanese origin, born in New York City and raised in the small town of East Stroudsburg in the state of Pennsylvania. Nadia is interested in social justice and human rights movements both in the U.S. and international context. She intends to pursue a law degree and career involving international human rights law. At NYUAD, she is involved in Students for Justice in Palestine, Africa Global, and currently serves as Co-President of the Muslim Student Association. Apart from her academics, Nadia enjoys playing and watching tennis, listening to music, preferably from different cultures and genres, and exploring different restaurants and cuisines. Her interests also include fashion, pop culture, comedy - especially political satire - reading the news, and catching up with current events. ", image:"img/mentors/currentMentors/nadia.jpg"},

{name:"Songyue", country:"China",position:"current", bio:"Songyue is a senior studying Social Research & Public Policy at New York University Abu Dhabi (NYUAD). Originally from China, she has studied and lived in multiple countries including Ghana, the United States, Britain, and the UAE. She is passionate about entrepreneurship and has had experiences in various industries, including retail, financial advisory, consulting, NGOs, and banking. At school, she has co-directed Girls’ Education Network, a student-initiated organization focusing on women leadership development. She has also organized several major cultural events in collaboration with NYUAD office of Spiritual Life & Intercultural Education. Songyue enjoys scuba diving, loves house music, and has recently found her passion in baseball. Most importantly, she welcomes honest conversations and never has anything to hide. Go talk to her!", image:"img/mentors/currentMentors/SongyueXu.jpg"},

{name:"Kevin", country:"Taiwan",position:"current", bio:"Kevin Ke is a rising Junior studying at NYU Abu Dhabi, majoring in Theatre and Economics. He was born in the countryside of New York before moving to Taiwan soon after, which has been his home ever since. He is particularly interested in exploring experimental movement-based theatre, because it ties into dancing, which is one of his hobbies. Additionally, he is trying out acting and devising as other potential directions. On campus, Kevin led the dance student organization, Attitude, and instructed a weekly breakdancing class for fellow peers. He is also pioneering the development of dance theory through Body Voices, a partner organization that focuses on movement as communication. Along with a group of theatre enthusiast friends, he is also a member of an independent theatre-making group, the Theater Collective. Lastly, he currently works as an Assistant Director for Online Model United Nations, a multinational non-profit organization that aims to bring MUN to students across the world, online. Other hobbies that he enjoys include choreography, video games, watching theatre, and public speaking. He look forwards to working with CAMA and meeting you!", image:"/img/mentors/currentMentors/KevinKe.jpg"},

{name:"Tami", country:"Macedonia",position:"current", bio:"Tami is a fourth year Biology student at NYU Abu Dhabi. Originally from Macedonia, she has crafted her university studies and work experiences between the UAE, China, Argentina, Sweden and the US. She now dedicates her time between the research lab, Student Government and competitive debate. Her primary academic interest in Genetics with a growing interest in the interaction between Genetics and the Law. She hopes to continue her education studying the ethical and legal implications of novel genetic technologies on individuals, private entities and countries around the globe from both a scientific and legal perspective. At university, she descovered an unparalleled love and dedication towards Student Government and Competitive Debating: she has held several positions at NYUAD's Student Government, and has represented her university on multiple international debate championships. In her free time, Tami loves to chill in her hammock with a good book (even more so, she loves napping in her hammock), run outdoors and dance (as long as nobody is watching). She has been a scout for more than 6 years, so nothing makes her happier than a hiking and camping getaway with good friends. Tami considers herself incredibly lucky to be attending a university abroad. As a massive believer in the transformative power of high-quality education, she is beyond excited to work alongside other CAMA mentors on helping you achieve your goals with applying to universities abroad.", image:"/img/mentors/currentMentors/Tami.jpg"},

{name:"Estelle", country:"Ghana",position:"current", bio:"Estelle is a rising sophomore at New York University Abu Dhabi from Ghana. Her academic interests include Economics, Philosophy, Computer Science and Music. Prior to joining NYUAD, Estelle taught at an SAT tutoring firm and assisted students with their applications, thus she is familiar with the Commonapp and college application process. Estelle also loves playing sports and spending time with people.",image:"/img/mentors/currentMentors/Estelle.jpg"},

/*
{name:"Edison", country:"Congo",position:"current", bio:"Edison Murairi is currently a sophomore pursuing a bachelor of science in Physics with minor degrees in Computer Science and Applied Mathematics. He is passionate about finding out the underlying realities of nature and teaching. Edison completed his high school degree in Science - Biology and Chemistry track at the College Notre Dame d’Afrique in Kinshasa. He then went to the African Leadership Academy where he obtained a diploma in Entrepreneurial and Leadership, and completed the Cambridge Advanced Levels in Further Mathematics, Mathematics and Physics earning the South African Outstanding Cambridge Learner Award in Further Mathematics. He plans to pursue a PhD degree in Theoretical Physics, and his long-term plan is to invest his scientific and entrepreneurial skills in science education fostering curiosity, creativity and rigorous critical thinking in students.",image:"/img/mentors/currentMentors/---.jpg"},
*/

/*
{name:"Ghadeer", country:"Palestine",position:"current", bio:"Ghadeer Ghosheh is a Palestinian Canadian first year computer engineering student at New York University Abu Dhabi. Last year, she graduated from a high school in  Palestine after being engaged in several projects for children with special needs. In the past 2 years, she has interned at 2 startups and is still committed to related work in her free time. Her life in university – aside from studying - involves being a part of the Archery and Arab Cultural Clubs as well as self-learning such as taking multiple online courses in different disciplines. In the coming summer, she  is planning to work on her new project, mentoring for special needs,  and to join a brainstorming committee for Palestinian youth startups.",image:"/img/mentors/currentMentors/---.jpg"},
*/

/*
{name:"Elyazyeh", country:"United Arab Emirates",position:"current", bio:"In 4th grade Elyazyeh Al Falacy transferred to a school that changed the trajectory of her life. From being the smartest student in class to the most unfocused. She was dumbfounded at her lack of ability when put in this new environment. She was put in a special-ed class to rapidly develop her English writing and reading skills to reach the standard of this new institution. Although this occurred early in her academic life, it was this close-knit program that allowed her to improve and ultimately thrive as a writer 10 years later. She has a possession of the English language that empowers her to be creative. Without this stronghold she wouldn't be the same pupil, artist, or intellectual that she is today. She is also passionate about social issues and she is culturally analytical of her own Emirati society. Between Music and Political Science, she finds herself emerging as a writer--a liberating path. As an upcoming senior, she is now interested in journalism, music, and art production. Mentorship is valuable, and it has provided her with a potential career that the little girl who struggled desperately in class could have never predicted.",image:"/img/mentors/currentMentors/---.jpg"},
*/

/*
{name:"Natasha", country:"Kenya",position:"current", bio:"Natasha Maria Treunen is currently a sophomore majoring in Psychology and probably film.  She is passionate about Human Rights and will fight for children especially since they are the future of tomorrow.  She enjoys working with people and is passionate about inspiring others to be the best they can be while also learning from them. She believes that everything is possible as long as individuals set their mind to it,  we are our own limiters. She hopes that this will be a great journey of giving back,  mentoring while also learning to become better with each day.",image:"/img/mentors/currentMentors/---.jpg"},
*/

/*
{name:"Faustine", country:"Rwanda",position:"current", bio:"Faustine Karasira is a rising senior student majoring in Political Science and minoring in History at NYU Abu Dhabi, from Kigali, Rwanda. She has a keen interest in youth political engagement in their countries, girls education and female empowerment. In high school, she studied at United World College of South East Asia (UWCSEA), where she was involved school activities concerning the reforestation of tropical forests in Malaysia with the Rainforest program and participated in raising funds for young Palestinian refugees to go to school with the Palestinian project. While at NYUAD, she took part in a research meant to provide evidence of counterculture events across the world in the 1960s. She will be interning with the Kigali Genocide Memorial creating a platform for the international youth to learn about the effects Genocide against Tutsi in Rwanda and the reconciliation process. Her hobbies are Political debates, reading non-fiction and mystery novels, watching football, movies and perform extreme sports (Zip lining, bungee jumping, paragliding)." ,image:"/img/mentors/currentMentors/---.jpg"},
*/

/*
{name:"Tiffany", country:"Nigeria",position:"current", bio:"Originally from Lagos, Nigeria, Tiffany recently graduated from Columbia University from the Fu Foundation School of Engineering and Applied Sciences (SEAS), where she studied Biomedical Engineering with a minor in Entrepreneurship & Innovation. She is passionate about bridging the gap between medicine and technology through digital health and using data to drive insights in diagnostics. She is now a Technology Consulting Analyst at Accenture in the New York Office, specializing in the Life Sciences industry. During her time at Columbia, she was the Vice President of Christian Union at Columbia (CU@C), Professional Relations Chair of the National Society of Black Engineers (NSBE), Vice President of Venom Step team, Peer Adviser of the Center for Student Advising.",image:"/img/mentors/currentMentors/---.jpg"},
*/

/*
{name:"Odera", country:"Nigeria",position:"current", bio:"Odera Chiamaka Ebeze is a rising Senior at NYUAD currently majoring in Political Science with minors in Legal Studies and Business Management. She is a proud Nigerian and has experiences studying IB in Canada. Some of her interests include watching tv series (Love and Hip Hop) included and videos of puppies on YouTube. Her goal after NYUAD is to attend Law School. She dreams of either being the President of Nigeria or a Diplomat. Also, she secretly wants to learn Spanish and Sign Language and can't wait to meet her new mentees!! Something people don't know about me: I have a birthmark in the middle of my head (it's a bald spot 😁)", image:"/img/mentors/currentMentors/---.jpg"},
*/

/*
{name:"-------", country:"---------",position:"current", bio:"I have a possession of the English language that empowers me to be creative. Without this stronghold I wouldn't be the same pupil, artist, or intellectual that I am today. I am also passionate about social issues as I am culturally analytical of my own Emirati society. Between Music and Political Science, I find myself emerging as a writer--a liberating path. As an upcoming senior, I am now interested in journalism, music, and art production. Mentorship is valuable, and it has provided me with a potential career that the little girl who struggled desperately in class could have never predicted",image:"/img/mentors/currentMentors/------.jpg"},
*/


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


var frequently_asked_questions = [

{title:"Collapsible Group Item #1", body:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS." },

{title:"Collapsible Group Item #2", body:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS." },

{title:"Collapsible Group Item #2", body:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS." },

{title:"Collapsible Group Item #4", body:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS." },

{title:"Collapsible Group Item #5", body:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS." },

{title:"Collapsible Group Item #6", body:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS." },

{title:"Collapsible Group Item #7", body:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS." },

{title:"Collapsible Group Item #8", body:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS." },

{title:"Collapsible Group Item #9", body:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS." },

{title:"Collapsible Group Item #10", body:"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS." }

];

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


//Going to FAQ
/*
app.get("/faq", function(req, res){
  res.render("faq",{frequently_asked_questions:frequently_asked_questions});
});

*/

//Privacy Policy and Terms of use

app.get("/privacy_policy", function(req, res){
  res.render("privacy_policy");
});

app.get("/terms_of_use", function(req,res){
  res.render("terms_of_use");
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

app.get("/currentMentors", function(req, res){
  res.render("currentMentors",{mentorList:mentorList});
});

app.get("/previousMentors", function(req, res){
  res.render("previousMentors",{mentorList:mentorList});
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

/////******Fetch API*******////

fetch({

  method: 'POST',
  url: 'https://us18.api.mailchimp.com/3.0/lists/'+process.env.LISTID+'/members',
  headers:
   { 'Postman-Token': process.env.POSTMANTOKEN,
     'Cache-Control': 'no-cache',
     Authorization: process.env.AUTORIZATION+'=',
     'Content-Type': 'application/json' },
  body: { email_address: req.body.email, status: 'subscribed' },
  json: true

}).then(function(){

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

})
});

/*
Adding Email To MAIL Chimp
var options =

  {

  method: 'POST',
  url: 'https://us18.api.mailchimp.com/3.0/lists/'+process.env.LISTID+'/members',
  headers:
   { 'Postman-Token': process.env.POSTMANTOKEN,
     'Cache-Control': 'no-cache',
     Authorization: process.env.AUTORIZATION+'=',
     'Content-Type': 'application/json' },
  body: { email_address: req.body.email, status: 'subscribed' },
  json: true

};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

res.redirect("/");

});


*/

//****** Routes TO Download Mentees and Mentors Contracts ******//
app.get('/Contracts/MenteeContract.pdf', function(req, res){
  var file = __dirname + '/public/img/Contracts/MenteeContract.pdf';
  res.download(file); // Set disposition and send it.
});

app.get('/Contracts/MentorContract.pdf', function(req, res){
  var file = __dirname + '/public/img/Contracts/MentorContract.pdf';
  res.download(file); // Set disposition and send it.
});


app.get('*', function(req, res){
  res.send('Sorry Page Not Found...', 404);
});
//Deploying Server

app.listen(process.env.PORT || 3001, function(req, res){
  console.log("Server Up and Running at 3001");
});
