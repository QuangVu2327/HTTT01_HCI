VNUHCM - University of Science Faculty of Information Technology CSC12106 – Lecture 5 

Design Process Persona – Value Proposition Lê Thị Nhàn ltnhan@fit.hcmus.edu.vn 

Designed by SlidesCarnival 

### Content 



- Review 

- Persona 

   - Activity 

###### • Value Proposition 

– Activity 

- Ref 

   - CS430’s lecture 

2 

HCI - FIT - HCMUS 

#### Modern Process 



<!-- Start of picture text -->
Human<br><!-- End of picture text -->



<!-- Start of picture text -->
DISCOVERY<br>PERPETUAL<br>DEPLOYMENT<br>‘ /<br>en CONCEPTION<br>APPLICATION TESTING +<br>USER EVALUATION<br>PROTOTYPING/<br>DESIGN/<br>DEVELOPMENT<br>Computer<br><!-- End of picture text -->



<!-- Start of picture text -->
| 4<br>// StakeholdersInterviews o—~F~ > Gal f lie 7 hg ‘<br>Ecosystem Map<br>Key Performance |a. =—1|<br>Indicators (KPIs) Fe<br>6 —+—_+—_—_+<br>\ — = ne |= Value Proposition<br>——-<br>a | Experience Map occas a “Q Pa<br>\YW Ee~ - . | PersonasE =| rs gs A<br>Audit Pal a<br>\ Competitive a > ral<br><!-- End of picture text -->

### Example 



- Task for doctors 

   - Prescribe medication for a patient using the prescription interface 

- We want to know 

   - "Is the interface easy to use?" 

   - (research question) 

- We have doctors wear a smartwatch to measure the heart rate (HR) 

5 

HCI - FIT - HCMUS 

### Example (cont.) 



- Application + smartwatch log 

   - When the doctor prescribes 

      - 08:12, HR = 72 bpm 

   - System reports an error 

      - 08:13, HR = 95 bpm 

      - "Medication conflict detected. Error Code: 0x8A42. Please contact the system administrator." 

   - When the doctor completed the task 

      - 08:20, HR = 74 bpm 

   - → _HR increases when system reports an error_ 

- Do we know the answer yet? 

   - HR increases ⇒ The interface becomes difficult to use ? 

6 

HCI - FIT - HCMUS 

### Example (cont.) 



###### • Observe 

   - Doctor pauses for 20 seconds, clicks the same button 3 times, reads the error message twice, moves the mouse around the screen 

   - → ⇒ _signs of trouble_ ( difficult to use???) 

- Think-aloud 

   - The doctor says 

      - "I'm not sure what this error means" 

      - "Did the prescription go through?" 

      - "Should I submit it again?” 

→ _Doctor doesn't understand the error message, not know current state of the system, not know what to do next_ 

- Did not say ”difficult to use" 

7 

HCI - FIT - HCMUS 

### Example (cont.) 



###### • Interview 

- We ask 

   - "You paused after the error message. Can you tell me what happened?" 

- Doctor says 

   - "I was worried that my prescription hadn't been saved" 

   - "The message didn't explain what I should do next” 

- → The doctor is worried about _losing data_ 

→ The error message does not provide instructions for the _next action_ 

8 

HCI - FIT - HCMUS 

### Example (cont.) 



**Technique Evidence** Doctor paused for 20 seconds and needed Observe assistance Doctor was unsure what the error meant and Think-aloud what to do next Heart rate increased while interacting with the Body monitoring error message Doctor explained that the message was Interview unclear and created uncertaint <u>y</u> 

###### • Conclude 

- The error message is unclear and leaves doctors uncertain about the system's status 

- ⇒ Reducing the usability of the interface 

9 

HCI - FIT - HCMUS 

### Example (cont.) 



###### • How do we gather enough evidence at a reasonable cost? 

- Strategy 

   - 1<sup>st</sup> : Use a cheapest method 

   - Still unclear ? 

   - 2<sup>nd</sup> : Add another method 

   - Still unclear ? 

   - 3<sup>rd</sup> : Add another method 

– … 

10 

HCI - FIT - HCMUS 



1. Persona Who is the user? 

### User centerd design 



- Understanding users 

   - Know your users 

      - Who are they? How are they different from us? 

   - Study your users 

      - Ask, observe 

   - Empathize with users 

      - Put ourselves in the users' situation to better understand their emotions, challenges, and needs 

- Every design decision must be based on an understanding of the user 

12 

HCI - FIT - HCMUS 



<!-- Start of picture text -->
Persona<br><!-- End of picture text -->

Model, summarize and communicate your findings about the end-users 

- + 

- f Don’tdesign forMr. Everybody 

### Persona 



- Description of a user group 

   - Shared behaviors in activities 

      - Purchase, use technology/products… 

   - Shared preferences 

      - Customer service, lifestyle choices… 

- Note 

   - are common 

   - _Behavior, attitudes, and motivations_ to a “type” of user regardless of age, gender, education, and other demographic attributes 

14 

HCI - FIT - HCMUS 

### Persona 



- Objectives 

   - To create a _fictional_ user who represents _real users_ 

   - To establish the user's mindset, desires, and necessary tasks 

   - To refer to the persona throughout the design creation process 

      - For every decision, designer always ask "What would persona think?" 

15 

HCI - FIT - HCMUS 



<!-- Start of picture text -->
Name oe Goals /Motivations<br>-<br>aa<br>7<br>a<br><!-- End of picture text -->

### Example 



###### Dr. Lan Tran **Basic Information** 

|Name|Dr. Lan Tran|
|---|---|
|Age|38|
|Role|Internal Medicine Physician|
|Experience|12 years|
|Workplace|General Hospital|
|Digital Literacy|Intermediate|
|Primary Device|Desktop PC in consultation<br>room|



###### **Goals** 

Dr. Lan wants to: 

- Complete each patient's medical record within 2–3 minutes. 

- Spend more time communicating with patients than interacting with the computer. 

- Avoid documentation mistakes. 

- Access patient history quickly. 

   - Finish documentation before the next patient arrives. 

- 

###### **Behaviors** 

Typical behaviors observed during shadowing 

- Types while talking with patients. 

   - Frequently switches between different tabs. 

- 

- Uses keyboard shortcuts whenever possible. 

- Often copies information from previous visits. 

###### **Background** 

Dr. Lan is an experienced physician who sees approximately 35–45 patients each day. During consultations, she must divide her attention between communicating with patients and documenting medical records in the Electronic Health Record (EHR) system. She values systems that are fast, reliable, and require minimal cognitive effort. 

- Double-checks patient information before saving. 

###### **Environment (Touch points)** 

During one consultation she may simultaneously interact with: 

- The patient, a nurse 

   - The EHR system 

- 

- Laboratory reports, prescription printer 

- Phone calls from colleagues 

Dr. Lan works in a busy outpatient clinic. Frequent interruptions are common. 

17 

HCI - FIT - HCMUS 

### Example (cont.) 



Dr. Lan Tran **Basic Information** 

Name Dr. Lan Tran Age 38 Role Internal Medicine Physician Experience 12 years Workplace General Hospital Digital Literacy Intermediate Primary Device Desktop PC in consultation room 

###### **Tasks** 

- Review patient history 

- Interview patients 

###### **Pain Points** 

Observed during contextual inquiry 

- The Save button is difficult to locate after scrolling. 

- The error message "Validation failed." does not explain what information is missing. 

- The interface becomes slow when opening previous laboratory results. 

- Too many clicks are required to prescribe routine medication. 

- Fear of losing data before saving. 

###### **Needs (Wishes)** 

###### **Frustrations** 

      - Dr. Lan becomes frustrated when 

   - Clear error messages. 

   - Automatic saving. when 

   - • Faster search. • The system freezes, • Fewer mouse clicks. • Information disappears, • • Keyboard shortcuts. Mandatory fields are 

   - • Better navigation. unclear, 

      - Information disappears, 

      - Identical information must be entered repeatedly. 

- Record diagnoses 

- Order laboratory tests 

- Prescribe medications 

###### **Quote** 

"I want to focus on my patient, not on figuring out how the software works." 

###### **Motivations** 

Dr. Lan believes technology should reduce administrative work rather than increase it. 

Her motivation is spend more time caring for patients not spend more time using software. 

18 

HCI - FIT - HCMUS 

### Dicussion 



- A good persona 

   - Built based on behavioral patterns, goals, motivations, not age, gender, interest 

      - Based on user discovery 

   - Must represent a group of users 

   - Helps the design team make better design decisions 

   - All items should be on one page/screen 

19 

HCI - FIT - HCMUS 

### Example 



###### • The design team uses the persona to inform design decisions 

|**Doctor persona**|**Design decisions**|
|---|---|
|Fear of losing data|Enable automatic saving with visible status<br>indicators|
|Frequent interruptions|Allow users to resume unfinished tasks easily<br>after interruptions|
|Difficult to locate Save button|Keep the Save button visible|
|Unclear error message|Display field-specific validation messages|



20 

HCI - FIT - HCMUS 

### Activity 



- Group of 4 

   - Interview each other 

      - A → B → C → D → A 

   - Interview content 

      - The use of the Moodle system 

   - Collect 4 notes about 4 students 

   - Find patterns 

      - Shared by at least 2–3 students in the group 

   - Create a persona 

      - What design decisions were made based on this persona? 

21 

HCI - FIT - HCMUS 



2. Value proposition 

What value should we create for this user? 

###### Your users don’t care about it! 



<!-- Start of picture text -->
ee<br><!-- End of picture text -->

IT’S NOT ABOUT YOUR TECH OR PRODUCT!!! 



<!-- Start of picture text -->
coe<br>Users<br><!-- End of picture text -->



<!-- Start of picture text -->
_é<br>Designers<br>Developers<br><!-- End of picture text -->

IT’S ABOUT SOLVING A PROBLEM OR A NEED FOR USERS 



<!-- Start of picture text -->
zoe \<br>Users Lesigners<br>Developers<br><!-- End of picture text -->

### Value proposition 



- Describes how a product/service creates value for a specific customer segment 

- Neither a _feature_ nor a _technology_ 

- – Features : what the system contains 

- – Technology : how the system is built 

   - Value Proposition : from the user's perspective 

      - What value does this provide for me? 

25 

HCI - FIT - HCMUS 

### Example 



- Talk about product 

   - Designer : Our system provides Auto Save 

   - – Doctor : Auto Save, so what? Just a feature 

- Talk about technology 

   - Developer : We use Redis for fast caching 

   - Doctor : Not interested 

- Talk about value 

   - We : Never lose patient records, even if your work is interrupted 

   - Doctor : Really concerned about 

26 

HCI - FIT - HCMUS 

||Exampl<br>|es<br>|
|---|---|---|
|**Product**|**Technology**|**Value**|
|AI assistant in<br>entering medical<br>records|Powered by Large<br>Language Models|Complete medical<br>documentation in half the<br>time, so you can spend<br>more time with your<br>patients|
|Clinical dashboard|Interactive<br>dashboard with<br>D3.js visualization|Make faster clinical<br>decisions with all essential<br>information in oneplace|
|Allergy Alert<br>Feature|Rule-based<br>inference engine|Avoid prescribing<br>medications that could<br>harmyourpatients|
|Smart Search|Elasticsearch|Find patient records<br>instantly|



27 

HCI - FIT - HCMUS 

### Discussion 



- Pain point : Afraid of losing patient notes 

- Designer : Auto save 

- Developer : Cloud backup 

- Manager : Version history 

- UX Designer : Recovery wizard 



all makes sense 

- Which one should we do? 

28 

HCI - FIT - HCMUS 

# <mark>LT</mark> 





##### Value Proposition 

Who are your end-users? What are you offering to them? 

cH C) Value Map User Profile 





<!-- Start of picture text -->
pads Preheatmee and Strategyzer<br><!-- End of picture text -->

@®Strategyzer strategyzer.com 



## ve itt @ 20 | 



<!-- Start of picture text -->
|<br><!-- End of picture text -->

### Examples 



**Value Map** 

###### **User Profile** 

**Pain Reliever:** Automatic saving prevents data loss during interruptions. 

**Pain:** Fear of losing patient records due to interruptions 

**Pain Reliever:** AI-assisted documentation streamlines clinical note-taking. 

**Pain:** Documentation is timeconsuming. 

**Gain Creator:** Automated documentation frees up more time for patient interaction 

**Gain:** Spend more time caring for patients. 

**Gain Creator:** An integrated dashboard presents essential clinical information at a lance <u>g</u> 

**Gain:** Access critical patient information quickly. 

33 

HCI - FIT - HCMUS 



<!-- Start of picture text -->
Copy or outperform current solutions that delight Help make adoption easier? Wat woulc make your customer's 00 or ite easer?<br>yourleg regartingcustomer?specie features. performance, quailty. J Performance.eg ower CONdesign,ess nest ments, kawer risk better quailty manses Matte meng Ore Tore serves cae cont<br>Make your customer's 00 or life easier? Rank each gain your products and services create accorcing to Whal DOSiIVE soca! Consequences Goes your<br>fogseraces,fatterlowerlearningcast curve,of ownership,usabilty, _)accessibilty, more Forfs relevanceeach gantoindicateyour Customer.Mow often5 ©& subscantaloccurs. or insignificant? coniemeerdicatiel@o Tests Tem or Good ncvease © Somer sa<br>customerCreatefag positivedesires?social consequences that your Wnat9S perare oS customersperlookeng eefor? or ee<br>fog motesrripkes f them oak *good. producesCAACeS aan wrereincre se a se 1i  pepoe Rg Dg‘isahevetets Og ees<br>Dofe.9 somethinggood design, customersguarantees, arespecificlooking or morefor? features, _) maeCoes you Custorne measure success anc<br>Furl something custorne’s are dreaming about? ep retrace =e<br>(egProguceben bgpositive activermntsoutcomesprosucwmatching big ralesyour x m i Wnatsoktor? would increase the lkminood of adopting a<br>fogcustomersbetter performance, success andlower failure criteria?cost, ) Gain Creators Gains Nal retefog tone con. tse cwentmerts, omer sok, Satter quai<br>ListProducts & Services: gerstomoFgars.Describe wadGoDostve theybeMow creteSurtrisedyourerotar, ProOLctS beretsby.and coenckdingandyour Serves storeysegs?hircona!Create pacts, Customerity soceSees WruchbDia e scribeovesuppesedsavingsEmoboNS,the benefitsby  wouldTheancmcucesyoucostTakeCustomer sawngshrctonslyour customereapRCIS.Uility, GESESsoos! nappy? OTROSgars. Raw—————BQ nececeOfergach ©ganoccurs arconingo et rageices?te ts merce Fo ear=D yourgar comermca Customer Job(s) o——0 =<br>buttWhich arounalail the procucts  productsa and anc services  services do you your offer value that  propestion heip your is es they... Wnatfog in outcomesterms of time.doesmoneyyourardCustomer effort expect anc what —GoreSoroscouldMe be*robesthe tasksDeytheywe aepeg TyingSee= peroor Teeand<br>Customerdone. oF helpget him/hereither a satisfyfunctional,basesocial,reeds?or emationa!job oO Createte. in terms savingsof time, thatmoney make and youreffort, Customer happy? would9 QuBity go Deyoevel morehss/herof somecming expectations?less of somecnng. Dey &e tyes to satety<br>performWhich ancilary the rolesprooucts of:  ard services help your customer f Ny that goProducebeyondoutcomestheiryourexpectations? customer expects or Howeg spectc Go currentfeatures sciutionsperformanceGelightguaity your customer? WratGet done? furctonalfe5 petomnobs areor youcomplete hepnga pecticyout a skstomesalve2<br>someting<br>Buyer fey better quanity eve mare of something fess of euctir pattem<br>fogoffers,productsdecide, andbuy, servicestake detverythat helpof customers compare ——_us—rp——— get<br>Co-creator a product or service. _) WhatCone? enotonaBs yes & botobs are gd youGer helping come ©yourSacustomer<br>(eg products and services that help custamers co-design QR OOP bg teres te poe ty |<br>salvhans, othernse contribute waive fo the sakiton<br>Transferrer(eg2Products proachproducts andtanater servicesand serncesft may thersthateitherhelpbyreel)customerstangible (eg.disposemanufacaf Pain. Relievers: Pains= -\a # Sately?Whatsence:cudanartotatentensiaianenSlaybasc TyraKet@5 needs=comuncetenSerenegets arecore youres ne helpingsex areDenonyas yourthe customer customercen - wor certs<br>tured goods, face-to-face custorner service, digitalvrtual Help your customers better sleep at right? Describe how your products and services alleviate customer Describe negatve emotions, undesred costs and stuabons How are carvert solutoss userperfo™ming oy<br>fogcopyrights,funds,downloads,Snarcingqualitycolineservices).assurance},recommendatioralor trancial (e.g.mtargbieinvestmentleg. feetmmatinngg by heigeng= worries.) wth bg sues. denersheg concerns, oF parsexpeneccesUGNFEDHow COBTSdcof theycoud ad elrmmate SELALIINE.experenceor reduceANCbefore, TISKSnegatve duringyour CUstO™Erancemotions.after BPStere aksing hal yOu eae CUSIOTETpengERDETEROESte ee teCF COU EEDEESE fyLg9 yourORGaxtef customer?ETREhatwes, pertemeee,SRA sateen,PRET Buyer(Co-cresiion &5 yngfeaes  =exthencs,bosMeigoodtee! gargood poseasnout o sae<br>empartarceRank al productsto youranccustomer.services accordingta their Limitte or eradicateie  common5  mistakes customers getting che job cone? Whatfog cates doesa 5¢ yourof  custome:tome, costs  find300 much too rmaney, costly?recneres yourWat arecustomer the mae n c o fficuttesunters?  and cualienges TranstererGapcofa prod. e s oa.c8e Carats arc& ereces Matto cers or eset te tome<br>Are they crucial oF trivia to your customer? cae Do they, sudscarter efforts Seen et es ; ; emai<br>Getfrom 116adoptingof acriorssolutions? that are keeping your customer Aryspeda= p>.ee-- oeoTeeE Whateg frustrators. makes yourannoyances customerThngsfee!thatbad?gue then @ What negative: socal consequences Goes your gyregoer open pherenee bones centered<br>RakSScurve,to theireachlessintensitypainresistanceyourfor your procuctsfoeechange.)customer,and services15 R very eeislintenseaccordingoF Make2Fix(egheagache. underperformingkitsyourfrustrations,customersannoyances,solutions?fee! better?things that give them neacacre custome:What(epfe 5 fesserersksof face doesencounterSoepoweryourDaceDust customeror fear?ost,fear?att Coe x omy Cut+: dave,semeitoncor 1Seehars i chbecamnespecie e SutRation omyconta aintaenpoee<br>very light? leg rea features. better performance Detter quality eos 2<br>FerCustomereach oieexperiencesindcate howoF Couldoften expenencei occurs, Risksbe“are.your dung Put an enc to difficulties and challenges your What's KEeping your Custome: emake at wgnt?<br>and atter getting the job dane? customers encounter? @o Og asus, Comers eonmes<br>ourf cute things easier heting them get done, elmmnate Ghat5 ae commenmoles atten °<br>Wipe out menegativein social Consequences your What nares avr ancons your Cason tor<br>customersfe. lossof face,encounterpower. trust. or fear?or status.) 5a eumeaneeAG reeset cos2 metry eOre essere.<br>Enmunate nsks your customers fear? moape<br>iitg francs! soca, tectrcal nK3 oF atet cougo Rareyouryh camomereaxeach p amar aa c amirg coning&© the rietyye¢ meoresetsoste<br>ForStvery eacn esepan rscatest weytom engt?toons<br>Copyright Business Model Foundry AG ()<br>The makers of Business Model Generation and Strategyzer strategyzer.com<br><!-- End of picture text -->





<!-- Start of picture text -->
Canvas cel “*. pos , clients<br>WU Sal Gain Creatorseretteninapstanecenaeasnansww Gains cpanety avw,eacastoememans eas :<br>Products & Services — easean Sone 7 Customer Job(s) So<br>| cae my ome<br>B ats ‘ +advance ke things<br>=onameneccay oeonline ranetovers RS cation! spifind, metstea ——A busnesbuild<br>7 eee<br>mmm ol ree mene nang ela well ideas f<br>Produced by swe stattys com strategyzer.com<br><!-- End of picture text -->

### Activity 



- Convert your Persona into Value Proposition Canvas 

   - Read Persona 

      - Don't think about solutions. Just read. 

   - Extract User Profile 

      - From Persona, identify Jobs, Pains, and Gains 

      - Still don't think about solutions 

   - Design Value Map 

      - How do we create value? 

   - Check "Fit” 

      - Which task is this Feature providing? 

         - If Feature doesn’t provide any task, reject it 

      - Which pain is this Pain Reliever addressing? 

         - If Pain Reliever doesn't relieve any pain, reject it 

      - Which gain is this Gain Creator addressing? 

         - If Gain Creator doesn't generate any gain, reject it 

36 

HCI - FIT - HCMUS 









<!-- Start of picture text -->
=<br>Mews<br><!-- End of picture text -->







