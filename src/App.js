import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Volume2, Ship, Skull, Crown } from "lucide-react";
import _ from "lodash";

import luffyImg from "./assets/luffy.png";
import zoroImg from "./assets/zoro.png";
import namiImg from "./assets/nami.png";
import usoppImg from "./assets/usopp.png";
import sanjiImg from "./assets/sanji.png";
import chopperImg from "./assets/chopper.png";
import robinImg from "./assets/robin.png";
import frankyImg from "./assets/franky.png";
import brookImg from "./assets/brook.png";
import jinbeImg from "./assets/jinbe.png";

// Update the image paths to match your CodeSandbox folder structure (src/assets/)
const characters = [
  {
    name: "Luffy",
    role: "Captain",
    catchphrase: "I'm gonna be King of the Pirates!",
    bgColor: "#dc2626",
    image: luffyImg,
  },
  {
    name: "Zoro",
    role: "Swordsman",
    catchphrase: "I'll become the world's greatest swordsman!",
    bgColor: "#16a34a",
    image: zoroImg,
  },
  {
    name: "Nami",
    role: "Navigator",
    catchphrase: "I'll draw a map of the whole world!",
    bgColor: "#ea580c",
    image: namiImg,
  },
  {
    name: "Usopp",
    role: "Sniper",
    catchphrase: "I'm a brave warrior of the sea!",
    bgColor: "#ca8a04",
    image: usoppImg,
  },
  {
    name: "Sanji",
    role: "Cook",
    catchphrase: "I'll find the All Blue!",
    bgColor: "#2563eb",
    image: sanjiImg,
  },
  {
    name: "Chopper",
    role: "Doctor",
    catchphrase: "I can help people by becoming the best doctor!",
    bgColor: "#db2777",
    image: chopperImg,
  },
  {
    name: "Robin",
    role: "Archaeologist",
    catchphrase: "I want to learn the true history!",
    bgColor: "#7c3aed",
    image: robinImg,
  },
  {
    name: "Franky",
    role: "Shipwright",
    catchphrase: "SUPER!",
    bgColor: "#0284c7",
    image: frankyImg,
  },
  {
    name: "Brook",
    role: "Musician",
    catchphrase: "Yohohoho!",
    bgColor: "#4b5563",
    image: brookImg,
  },
  {
    name: "Jinbe",
    role: "Helmsman",
    catchphrase: "I'll guide this ship to the ends of the sea!",
    bgColor: "#0f766e",
    image: jinbeImg,
  },
];

// Each stage now has 20 possible words (each with an example sentence)
// Feel free to adjust these words for a 5th-grade spelling bee.
// (Below are sample arrays for stage1 through stage5; include similar arrays for stages 6–20.)
const wordDatabase = {
  stage1: [
    { word: "absurd", sentence: "The idea was completely absurd." },
    { word: "adapt", sentence: "We must adapt to new challenges." },
    { word: "adjust", sentence: "Please adjust the volume." },
    { word: "affect", sentence: "Weather can affect our mood." },
    { word: "aloud", sentence: "Read the poem aloud." },
    { word: "apologize", sentence: "I must apologize for my mistake." },
    { word: "approve", sentence: "Her parents approve of her plan." },
    { word: "arrange", sentence: "Arrange the books neatly." },
    { word: "assist", sentence: "I will assist you with your work." },
    { word: "attend", sentence: "I plan to attend the assembly." },
    { word: "balance", sentence: "Find balance in your daily routine." },
    { word: "believe", sentence: "I believe in working hard." },
    { word: "bizarre", sentence: "That event was bizarre." },
    { word: "cancel", sentence: "They had to cancel the game." },
    { word: "chance", sentence: "Take a chance and try it." },
    { word: "compare", sentence: "Compare the two answers." },
    { word: "compete", sentence: "They compete in a spelling contest." },
    { word: "confirm", sentence: "Please confirm your attendance." },
    { word: "connect", sentence: "We connect ideas to learn." },
    { word: "consist", sentence: "The dish consists of rice and beans." },
  ],
  stage2: [
    { word: "confuse", sentence: "The instructions confuse many students." },
    { word: "consider", sentence: "Consider all the options." },
    { word: "control", sentence: "He tried to control his temper." },
    { word: "create", sentence: "She likes to create art." },
    { word: "culture", sentence: "Every country has a unique culture." },
    { word: "curious", sentence: "The kitten was very curious." },
    { word: "custom", sentence: "It is a local custom to greet warmly." },
    { word: "cycle", sentence: "She learned how to cycle last summer." },
    { word: "damage", sentence: "The storm caused severe damage." },
    { word: "defend", sentence: "The soldier will defend his country." },
    { word: "delight", sentence: "The surprise brought delight." },
    { word: "deserve", sentence: "Everyone deserves respect." },
    { word: "detect", sentence: "The scientist can detect small changes." },
    { word: "develop", sentence: "It takes time to develop skills." },
    { word: "device", sentence: "This is a useful device." },
    { word: "diminish", sentence: "The noise began to diminish." },
    { word: "discover", sentence: "They discover new facts every day." },
    { word: "disguise", sentence: "He wore a disguise at the party." },
    { word: "dismiss", sentence: "The teacher did not dismiss the question." },
    { word: "display", sentence: "The museum will display the artifacts." },
  ],
  stage3: [
    { word: "eager", sentence: "She was eager to start her project." },
    { word: "educate", sentence: "We must educate ourselves about the issue." },
    { word: "elaborate", sentence: "Please elaborate on your answer." },
    { word: "elevate", sentence: "They plan to elevate the stage." },
    { word: "emerge", sentence: "New opportunities emerge daily." },
    { word: "emotion", sentence: "Music can evoke strong emotion." },
    { word: "employ", sentence: "They plan to employ more workers." },
    { word: "enable", sentence: "This tool will enable us to work faster." },
    { word: "endure", sentence: "We must endure the hardships." },
    { word: "engage", sentence: "The teacher will engage the class." },
    { word: "enhance", sentence: "A good diet can enhance performance." },
    { word: "enrich", sentence: "Travel can enrich your life." },
    { word: "ensure", sentence: "Please ensure all tasks are complete." },
    { word: "entitle", sentence: "This book will entitle you to a prize." },
    { word: "evolve", sentence: "Species evolve over time." },
    { word: "examine", sentence: "The doctor will examine the patient." },
    { word: "excel", sentence: "She will excel in her studies." },
    { word: "exert", sentence: "They must exert effort to succeed." },
    { word: "exile", sentence: "The leader was exiled from his country." },
    { word: "expand", sentence: "We need to expand our horizons." },
  ],
  stage4: [
    { word: "familiar", sentence: "The story sounded familiar." },
    { word: "feature", sentence: "The museum has a new feature." },
    { word: "flexible", sentence: "A flexible schedule is ideal." },
    { word: "flourish", sentence: "The plants began to flourish." },
    { word: "forbid", sentence: "It is forbidden to run in the hall." },
    { word: "foresee", sentence: "I can foresee a bright future." },
    { word: "forget", sentence: "Don't forget your homework." },
    { word: "fortunate", sentence: "They were fortunate to win." },
    { word: "frantic", sentence: "She became frantic when she lost her keys." },
    { word: "frequent", sentence: "Frequent visits improve familiarity." },
    { word: "function", sentence: "Every object has a function." },
    { word: "furnish", sentence: "They will furnish the new house." },
    { word: "gallery", sentence: "The gallery exhibited modern art." },
    { word: "genuine", sentence: "He showed genuine concern." },
    { word: "gesture", sentence: "A kind gesture went a long way." },
    { word: "glimpse", sentence: "I caught a glimpse of the sunset." },
    { word: "graceful", sentence: "The dancer was graceful." },
    { word: "gravity", sentence: "Gravity pulls us to the Earth." },
    { word: "guarantee", sentence: "I guarantee you'll enjoy it." },
    { word: "guilty", sentence: "He felt guilty about the mistake." },
  ],
  stage5: [
    { word: "habitat", sentence: "Animals live in their natural habitat." },
    { word: "harmony", sentence: "The choir sang in perfect harmony." },
    { word: "hesitate", sentence: "Don't hesitate to ask for help." },
    { word: "historic", sentence: "This is a historic landmark." },
    { word: "honor", sentence: "It is an honor to be here." },
    { word: "humble", sentence: "He remained humble despite his success." },
    { word: "hypothesis", sentence: "The scientist formed a hypothesis." },
    { word: "identify", sentence: "Please identify the unknown object." },
    {
      word: "illustrate",
      sentence: "The diagram will illustrate the process.",
    },
    { word: "immediate", sentence: "She needed immediate assistance." },
    { word: "impartial", sentence: "A judge must be impartial." },
    { word: "impulse", sentence: "Acting on impulse can be risky." },
    { word: "incentive", sentence: "They offered an incentive for hard work." },
    { word: "incorporate", sentence: "We will incorporate new ideas." },
    { word: "indicate", sentence: "The arrow indicates the direction." },
    { word: "indulge", sentence: "Sometimes, it's okay to indulge." },
    { word: "influence", sentence: "Peers can influence your decisions." },
    { word: "inform", sentence: "Please inform me of any changes." },
    { word: "inherit", sentence: "He will inherit the family fortune." },
    { word: "innovate", sentence: "We must innovate to remain competitive." },
  ],
  stage6: [
    { word: "justify", sentence: "Can you justify your decision?" },
    { word: "keen", sentence: "She has a keen sense of observation." },
    { word: "laborious", sentence: "The task was laborious but rewarding." },
    { word: "magnanimous", sentence: "He was magnanimous in victory." },
    { word: "mandatory", sentence: "Attendance is mandatory." },
    { word: "manipulate", sentence: "Do not manipulate the results." },
    { word: "meticulous", sentence: "She is meticulous about details." },
    { word: "mimic", sentence: "He can mimic his teacher perfectly." },
    { word: "modify", sentence: "We need to modify our approach." },
    { word: "navigate", sentence: "They will navigate through the maze." },
    { word: "notorious", sentence: "The criminal was notorious." },
    { word: "novel", sentence: "He wrote an intriguing novel." },
    { word: "oblivious", sentence: "She was oblivious to the noise." },
    { word: "obscure", sentence: "The meaning was obscure." },
    { word: "obtain", sentence: "You must obtain permission first." },
    { word: "oppose", sentence: "Some oppose the new law." },
    { word: "optimistic", sentence: "Stay optimistic about the future." },
    { word: "ordinate", sentence: "They are arranged in ordinal order." },
    { word: "overwhelm", sentence: "The workload began to overwhelm him." },
    { word: "paradox", sentence: "It was a strange paradox." },
  ],
  stage7: [
    { word: "perceive", sentence: "We perceive the world through our senses." },
    { word: "permanent", sentence: "They made a permanent decision." },
    { word: "persist", sentence: "Never give up; persist until you succeed." },
    { word: "phenomenon", sentence: "That event was a natural phenomenon." },
    { word: "plausible", sentence: "Her explanation was plausible." },
    { word: "portray", sentence: "The actor can portray many characters." },
    { word: "precise", sentence: "Be precise in your measurements." },
    { word: "predict", sentence: "Can you predict the outcome?" },
    { word: "prejudice", sentence: "Prejudice can harm society." },
    { word: "presume", sentence: "I presume you'll arrive on time." },
    { word: "prevail", sentence: "Justice will prevail." },
    { word: "proceed", sentence: "Please proceed to the next step." },
    { word: "proclaim", sentence: "They will proclaim the winner soon." },
    { word: "proficient", sentence: "She is proficient in many subjects." },
    { word: "prominent", sentence: "He is a prominent historical figure." },
    { word: "propose", sentence: "I propose a toast to our success." },
    { word: "prosper", sentence: "May you prosper in all your endeavors." },
    { word: "provoke", sentence: "His remarks will provoke a reaction." },
    { word: "pseudonym", sentence: "Many authors use a pseudonym." },
    { word: "pursue", sentence: "Pursue your dreams relentlessly." },
  ],
  stage8: [
    { word: "recall", sentence: "I cannot recall his name." },
    { word: "recede", sentence: "The tide began to recede." },
    { word: "refine", sentence: "They refine the process continually." },
    { word: "reflect", sentence: "Mirrors reflect images." },
    { word: "regret", sentence: "He began to regret his decision." },
    { word: "reject", sentence: "She may reject the offer." },
    { word: "relevant", sentence: "The data is relevant to our study." },
    { word: "rely", sentence: "You can rely on me." },
    { word: "remedy", sentence: "A remedy was found for the ailment." },
    { word: "renew", sentence: "Please renew your subscription." },
    { word: "repay", sentence: "I will repay my loan soon." },
    { word: "resemble", sentence: "He closely resembles his father." },
    { word: "resolve", sentence: "Let's resolve this issue." },
    { word: "resist", sentence: "It is hard to resist temptation." },
    { word: "retain", sentence: "Try to retain this information." },
    { word: "reveal", sentence: "She will reveal the secret soon." },
    { word: "reverse", sentence: "They decided to reverse the decision." },
    { word: "rigid", sentence: "The rules are very rigid." },
    { word: "romance", sentence: "The book had a touch of romance." },
    { word: "ruthless", sentence: "The ruler was ruthless in his policies." },
  ],
  stage9: [
    { word: "sacrifice", sentence: "Heroes often sacrifice for others." },
    { word: "salient", sentence: "The salient points were clear." },
    { word: "sanctuary", sentence: "The park is a sanctuary for wildlife." },
    { word: "scenario", sentence: "Imagine a scenario where you win." },
    { word: "scenery", sentence: "The mountain scenery was breathtaking." },
    { word: "scrutiny", sentence: "The project is under scrutiny." },
    { word: "seclude", sentence: "They prefer to seclude themselves." },
    { word: "sensational", sentence: "The news was sensational." },
    { word: "sequence", sentence: "Arrange the events in sequence." },
    { word: "serene", sentence: "The lake was serene and calm." },
    { word: "severe", sentence: "The storm was severe." },
    { word: "shatter", sentence: "The vase might shatter if dropped." },
    { word: "sincere", sentence: "A sincere apology goes a long way." },
    { word: "sketch", sentence: "He made a quick sketch of the scene." },
    { word: "solicit", sentence: "They solicit feedback from customers." },
    { word: "sophisticated", sentence: "The design is very sophisticated." },
    { word: "squadron", sentence: "A squadron of planes flew overhead." },
    { word: "stagger", sentence: "He began to stagger after the fall." },
    { word: "sustain", sentence: "They strive to sustain growth." },
    { word: "symbolic", sentence: "The dove is symbolic of peace." },
  ],
  stage10: [
    { word: "tangible", sentence: "The evidence was tangible." },
    { word: "teem", sentence: "The field teems with wildflowers." },
    { word: "temporary", sentence: "This job is only temporary." },
    { word: "tension", sentence: "Tension filled the room." },
    { word: "thorough", sentence: "A thorough check was necessary." },
    { word: "timid", sentence: "The cat was very timid." },
    { word: "toxic", sentence: "Certain chemicals are toxic." },
    { word: "transient", sentence: "Feelings can be transient." },
    { word: "transmit", sentence: "Radio waves transmit signals." },
    { word: "treaty", sentence: "They signed a peace treaty." },
    { word: "trivial", sentence: "Don't worry about trivial details." },
    { word: "turbulent", sentence: "The flight was turbulent." },
    { word: "ultimate", sentence: "That was the ultimate challenge." },
    { word: "undermine", sentence: "Criticism can undermine confidence." },
    { word: "unequivocal", sentence: "Her answer was unequivocal." },
    { word: "unify", sentence: "We must unify to succeed." },
    { word: "unique", sentence: "Every individual is unique." },
    { word: "validate", sentence: "We need to validate the results." },
    { word: "variety", sentence: "A variety of options are available." },
    { word: "versatile", sentence: "She is versatile in many skills." },
  ],
  stage11: [
    { word: "vibrant", sentence: "The garden was vibrant with colors." },
    { word: "vigor", sentence: "He showed great vigor in his work." },
    { word: "virtue", sentence: "Honesty is a virtue." },
    { word: "vision", sentence: "She had a clear vision for the future." },
    { word: "vivid", sentence: "The painting was vivid and bold." },
    { word: "voluntary", sentence: "Participation is voluntary." },
    { word: "wander", sentence: "They like to wander in nature." },
    { word: "whimsical", sentence: "The design was whimsical." },
    { word: "widespread", sentence: "The trend was widespread." },
    { word: "yield", sentence: "The farm will yield a good harvest." },
    { word: "zealous", sentence: "She was zealous about her work." },
    { word: "zenith", sentence: "The sun reached its zenith." },
    { word: "zephyr", sentence: "A gentle zephyr cooled the day." },
    { word: "abound", sentence: "Opportunities abound in the city." },
    { word: "absorb", sentence: "The sponge can absorb a lot of water." },
    { word: "abstract", sentence: "The art was abstract and modern." },
    { word: "abundant", sentence: "The orchard was abundant with fruit." },
    { word: "acclaim", sentence: "The performance received much acclaim." },
    { word: "acquire", sentence: "You must work hard to acquire knowledge." },
    { word: "adapt", sentence: "We must adapt to new challenges." },
  ],
  stage12: [
    { word: "adequate", sentence: "Ensure you have adequate supplies." },
    { word: "adjacent", sentence: "The park is adjacent to the school." },
    {
      word: "advocate",
      sentence: "He will advocate for environmental protection.",
    },
    { word: "affluent", sentence: "They live in an affluent neighborhood." },
    { word: "agitate", sentence: "Do not agitate the situation." },
    { word: "allocate", sentence: "We need to allocate resources wisely." },
    { word: "ambiguous", sentence: "The instructions were ambiguous." },
    { word: "analogy", sentence: "He used an analogy to explain the concept." },
    { word: "analyze", sentence: "We must analyze the data carefully." },
    { word: "annual", sentence: "The annual festival was a success." },
    { word: "anticipate", sentence: "I anticipate a positive outcome." },
    { word: "apparent", sentence: "It was apparent that she was upset." },
    { word: "arbitrary", sentence: "The decision seemed arbitrary." },
    { word: "assemble", sentence: "They will assemble the furniture." },
    { word: "assess", sentence: "We need to assess the situation." },
    { word: "attain", sentence: "Hard work helps you attain success." },
    { word: "attribute", sentence: "She attributed her success to hard work." },
    { word: "augment", sentence: "We will augment our resources." },
    { word: "autonomous", sentence: "The robot is fully autonomous." },
    { word: "avenue", sentence: "Walk down the main avenue." },
  ],
  stage13: [
    { word: "benevolent", sentence: "Her actions were truly benevolent." },
    { word: "blatant", sentence: "It was a blatant disregard for rules." },
    { word: "boisterous", sentence: "The crowd was boisterous and loud." },
    { word: "briefcase", sentence: "He carried a sleek briefcase." },
    { word: "candid", sentence: "She gave a candid interview." },
    { word: "carnival", sentence: "The carnival was filled with excitement." },
    { word: "celebrate", sentence: "They gather to celebrate victories." },
    { word: "chronicle", sentence: "He kept a chronicle of his adventures." },
    { word: "coherent", sentence: "Her speech was coherent and persuasive." },
    { word: "collaborate", sentence: "They collaborate on creative projects." },
    { word: "commence", sentence: "The ceremony will commence shortly." },
    { word: "commodity", sentence: "Oil is a valuable commodity." },
    { word: "comparable", sentence: "The two items are comparable in value." },
    { word: "compassion", sentence: "She showed great compassion." },
    {
      word: "comprehensive",
      sentence: "The report was comprehensive and detailed.",
    },
    { word: "concede", sentence: "He refused to concede defeat." },
    { word: "condone", sentence: "We cannot condone that behavior." },
    { word: "confer", sentence: "The school will confer degrees next month." },
    { word: "confine", sentence: "The patient was confined to bed." },
    { word: "consecutive", sentence: "She won three consecutive awards." },
  ],
  stage14: [
    { word: "contemplate", sentence: "He began to contemplate his future." },
    { word: "contradict", sentence: "Don't contradict your own words." },
    { word: "convene", sentence: "They convened for an emergency meeting." },
    { word: "corroborate", sentence: "The evidence corroborates her story." },
    { word: "credible", sentence: "The witness was very credible." },
    { word: "criteria", sentence: "We must meet the criteria." },
    {
      word: "culminate",
      sentence: "The event will culminate in a final performance.",
    },
    {
      word: "cumulative",
      sentence: "The cumulative score increased steadily.",
    },
    { word: "debris", sentence: "The storm left debris everywhere." },
    { word: "deduce", sentence: "We can deduce the answer from the clues." },
    { word: "deficient", sentence: "The report was deficient in details." },
    { word: "deliberate", sentence: "It was a deliberate decision." },
    { word: "deteriorate", sentence: "The building began to deteriorate." },
    { word: "devastate", sentence: "The earthquake devastated the town." },
    { word: "diminish", sentence: "His influence began to diminish." },
    { word: "discrepancy", sentence: "There is a discrepancy in the data." },
    { word: "disdain", sentence: "He looked at them with disdain." },
    { word: "disperse", sentence: "The crowd began to disperse." },
    { word: "diverse", sentence: "The class is very diverse." },
    { word: "dominate", sentence: "The team will dominate the competition." },
  ],
  stage15: [
    { word: "elusive", sentence: "The solution remained elusive." },
    { word: "emulate", sentence: "Try to emulate her work ethic." },
    { word: "enigma", sentence: "The mystery was an enigma." },
    { word: "equation", sentence: "Solve the equation step by step." },
    { word: "equivalent", sentence: "These items are equivalent in value." },
    { word: "euphoria", sentence: "She was filled with euphoria." },
    { word: "exaggerate", sentence: "Don't exaggerate your accomplishments." },
    { word: "exemplify", sentence: "He exemplifies what a leader should be." },
    { word: "exhaustive", sentence: "The research was exhaustive." },
    { word: "exotic", sentence: "They sampled exotic dishes." },
    { word: "explicit", sentence: "The instructions were explicit." },
    { word: "exquisite", sentence: "The sculpture was exquisite." },
    { word: "extinct", sentence: "Dinosaurs are extinct." },
    { word: "extol", sentence: "They extolled her virtues." },
    { word: "extravagant", sentence: "The party was extravagant." },
    { word: "fascinate", sentence: "The book continues to fascinate readers." },
    { word: "flourish", sentence: "Her business began to flourish." },
    { word: "formidable", sentence: "He is a formidable opponent." },
    {
      word: "fragrance",
      sentence: "The fragrance of the flowers was enchanting.",
    },
    { word: "futile", sentence: "It was futile to argue further." },
  ],
  stage16: [
    { word: "gregarious", sentence: "He was known for his gregarious nature." },
    { word: "hierarchy", sentence: "The organization has a clear hierarchy." },
    { word: "hypothesis", sentence: "The hypothesis was rigorously tested." },
    { word: "illicit", sentence: "Illicit activities are not tolerated." },
    { word: "immaculate", sentence: "The room was immaculate." },
    {
      word: "impetuous",
      sentence: "His impetuous actions surprised everyone.",
    },
    { word: "incessant", sentence: "The rain was incessant." },
    { word: "incisive", sentence: "She made incisive remarks." },
    {
      word: "incongruous",
      sentence: "The color was incongruous with the design.",
    },
    { word: "indignant", sentence: "She was indignant at the injustice." },
    { word: "inept", sentence: "His attempt was inept." },
    { word: "infallible", sentence: "No one is infallible." },
    { word: "infer", sentence: "I can infer his meaning." },
    { word: "inhibit", sentence: "Fear can inhibit progress." },
    { word: "inquire", sentence: "I must inquire about the details." },
    { word: "insight", sentence: "Her insight was valuable." },
    { word: "inspire", sentence: "Great leaders inspire others." },
    { word: "integrity", sentence: "Integrity is essential." },
    { word: "intrepid", sentence: "The explorer was intrepid." },
    { word: "intricate", sentence: "The design was intricate." },
  ],
  stage17: [
    {
      word: "juxtapose",
      sentence: "They juxtapose modern art with classical music.",
    },
    { word: "kinetic", sentence: "The kinetic sculpture moved with the wind." },
    {
      word: "luminous",
      sentence: "The luminous display caught everyone's eye.",
    },
    { word: "malleable", sentence: "The metal is malleable when heated." },
    {
      word: "melancholy",
      sentence: "There was a touch of melancholy in her tone.",
    },
    {
      word: "metamorphosis",
      sentence: "The caterpillar undergoes a metamorphosis.",
    },
    { word: "mundane", sentence: "He was tired of the mundane routine." },
    { word: "narrative", sentence: "The narrative was compelling." },
    { word: "nebulous", sentence: "His ideas were nebulous." },
    {
      word: "oblivious",
      sentence: "She was oblivious to the chaos around her.",
    },
    { word: "obsolete", sentence: "That technology is now obsolete." },
    { word: "ominous", sentence: "The sky looked ominous." },
    { word: "opulent", sentence: "The palace was opulent." },
    { word: "oscillate", sentence: "The fan oscillates from side to side." },
    { word: "panorama", sentence: "The panorama was breathtaking." },
    { word: "paradox", sentence: "That statement is a paradox." },
    { word: "perpetual", sentence: "The machine runs in perpetual motion." },
    { word: "phenomenon", sentence: "That is a rare phenomenon." },
    { word: "plausible", sentence: "The excuse sounded plausible." },
    { word: "profound", sentence: "She offered a profound insight." },
  ],
  stage18: [
    { word: "quandary", sentence: "He was in a quandary about what to do." },
    { word: "quintessential", sentence: "This is the quintessential example." },
    { word: "rancor", sentence: "There was deep rancor in his voice." },
    { word: "rebuke", sentence: "The teacher issued a stern rebuke." },
    { word: "reconcile", sentence: "They must reconcile their differences." },
    { word: "redundant", sentence: "Those extra words were redundant." },
    { word: "refute", sentence: "She managed to refute the claim." },
    { word: "relinquish", sentence: "He refused to relinquish his rights." },
    { word: "remorse", sentence: "She felt deep remorse for her actions." },
    { word: "renegade", sentence: "He was considered a renegade." },
    { word: "replicate", sentence: "Scientists can replicate the experiment." },
    { word: "resilient", sentence: "Children can be incredibly resilient." },
    { word: "resonate", sentence: "The music resonated with the audience." },
    { word: "rigor", sentence: "The course is known for its rigor." },
    { word: "sanction", sentence: "The committee will sanction the event." },
    { word: "scintillating", sentence: "Her conversation was scintillating." },
    { word: "scrutinize", sentence: "Critics scrutinize every detail." },
    { word: "spontaneous", sentence: "They took a spontaneous trip." },
    {
      word: "substantiate",
      sentence: "You need evidence to substantiate that claim.",
    },
    { word: "succinct", sentence: "Please be succinct in your answer." },
  ],
  stage19: [
    { word: "superfluous", sentence: "That extra comment was superfluous." },
    { word: "surreptitious", sentence: "They had a surreptitious meeting." },
    { word: "suspense", sentence: "The movie was full of suspense." },
    { word: "synthesize", sentence: "We must synthesize the data." },
    { word: "taciturn", sentence: "He is taciturn by nature." },
    { word: "tenacious", sentence: "Her tenacious spirit impressed everyone." },
    { word: "transcend", sentence: "Great art transcends time." },
    { word: "treacherous", sentence: "The path was treacherous." },
    { word: "ubiquitous", sentence: "Smartphones are ubiquitous these days." },
    { word: "ultimatum", sentence: "They gave an ultimatum." },
    { word: "unanimous", sentence: "The decision was unanimous." },
    { word: "unorthodox", sentence: "He has unorthodox methods." },
    { word: "upholstery", sentence: "The chair's upholstery is worn." },
    { word: "utilize", sentence: "We can utilize these resources." },
    { word: "vacillate", sentence: "She tends to vacillate between choices." },
    { word: "validate", sentence: "Please validate your ticket." },
    { word: "venerate", sentence: "They venerate their ancestors." },
    { word: "verbatim", sentence: "Repeat the instructions verbatim." },
    { word: "versatile", sentence: "He is a versatile performer." },
    { word: "vicarious", sentence: "She experienced it vicariously." },
  ],
  stage20: [
    { word: "zealous", sentence: "The fans were zealous in their support." },
    { word: "zenith", sentence: "The sun reached its zenith." },
    { word: "zest", sentence: "She approached life with zest." },
    { word: "aberration", sentence: "That was an aberration from the norm." },
    { word: "acquiesce", sentence: "They had to acquiesce to the demands." },
    { word: "adamant", sentence: "He was adamant about his decision." },
    { word: "admonish", sentence: "She admonished him for his behavior." },
    { word: "affable", sentence: "The host was very affable." },
    { word: "alacrity", sentence: "He accepted with alacrity." },
    { word: "ambivalent", sentence: "She felt ambivalent about the offer." },
    { word: "anachronistic", sentence: "The style seemed anachronistic." },
    { word: "animosity", sentence: "There was animosity between the rivals." },
    { word: "antithesis", sentence: "She is the antithesis of me." },
    { word: "apathy", sentence: "The report showed widespread apathy." },
    { word: "approbation", sentence: "The project received approbation." },
    { word: "archetype", sentence: "He is the archetype of a hero." },
    { word: "ascertain", sentence: "We need to ascertain the facts." },
    {
      word: "aspiration",
      sentence: "Her aspiration is to become an astronaut.",
    },
    { word: "assimilate", sentence: "They will assimilate the new ideas." },
    { word: "audacious", sentence: "It was an audacious plan." },
  ],
};

const SpellingBeeApp = () => {
  // Window width state
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Main states
  const [currentStage, setCurrentStage] = useState(1);
  // Load 20 words for the current stage.
  const [stageWords, setStageWords] = useState([]);
  // We will randomly pick one word from these 20.
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  // Cumulative score: number of rounds the user got correct.
  const [totalScore, setTotalScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [currentCharacter, setCurrentCharacter] = useState(characters[0]);

  // Debug log for stage changes.
  useEffect(() => {
    console.log("currentStage updated:", currentStage);
  }, [currentStage]);

  // Load 20 words for the current stage when currentStage changes.
  useEffect(() => {
    const stageKey = `stage${currentStage}`;
    const availableWords = wordDatabase[stageKey] || wordDatabase.stage1;
    console.log("Loading 20 words for", stageKey);
    setStageWords(_.shuffle(availableWords).slice(0, 20));
  }, [currentStage]);

  // Once the 20 words are loaded, pick one randomly.
  useEffect(() => {
    if (stageWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * stageWords.length);
      setCurrentWordIndex(randomIndex);
    }
  }, [stageWords]);

  // Change character when the challenge word changes.
  useEffect(() => {
    setCurrentCharacter(
      characters[Math.floor(Math.random() * characters.length)]
    );
  }, [currentWordIndex]);

  const currentWord = stageWords[currentWordIndex] || {
    word: "",
    sentence: "",
  };

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.rate = 0.5;
    window.speechSynthesis.speak(utterance);
  };

  const speakSentence = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.sentence);
    utterance.rate = 0.5;
    window.speechSynthesis.speak(utterance);
  };

  // Check answer and end the round after 3 seconds.
  const checkAnswer = () => {
    const correct =
      userInput.toLowerCase().trim() === currentWord.word.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setTotalScore((prev) => prev + 1);
    }
    setTimeout(() => {
      setGameStatus("stage_complete");
    }, 3000);
  };

  // Advance to the next stage.
  const startNextStage = () => {
    console.log(
      "startNextStage clicked, currentStage before update:",
      currentStage
    );
    setCurrentStage((prev) => prev + 1);
    // Reset input and result states.
    setUserInput("");
    setShowResult(false);
    setIsCorrect(false);
    setGameStatus("playing");
  };

  // Resize listener.
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #1e40af, #1e3a8a)",
        minHeight: "100vh",
        padding: windowWidth < 640 ? "1rem" : "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: windowWidth < 640 ? "100%" : "800px",
          margin: "0 auto",
        }}
      >
        <Card className="bg-white shadow-xl">
          <CardContent style={{ padding: windowWidth < 640 ? "1rem" : "2rem" }}>
            {/* Character Display */}
            <div
              style={{
                display: "flex",
                flexDirection: windowWidth < 640 ? "column" : "row",
                alignItems: "center",
                justifyContent: "center",
                gap: windowWidth < 640 ? "1rem" : "1.5rem",
                marginBottom: windowWidth < 640 ? "1.5rem" : "2rem",
              }}
            >
              <div
                style={{
                  width: windowWidth < 640 ? "72px" : "96px",
                  height: windowWidth < 640 ? "72px" : "96px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px solid #facc15",
                  backgroundColor: currentCharacter.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  src={currentCharacter.image}
                  alt={currentCharacter.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    padding: "2px",
                    backgroundColor: "white",
                  }}
                  onError={(e) => {
                    console.error(
                      "Image failed to load:",
                      currentCharacter.image
                    );
                  }}
                />
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: windowWidth < 640 ? "0.75rem" : "1rem",
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.5rem",
                  width: windowWidth < 640 ? "100%" : "auto",
                }}
              >
                <h3
                  style={{
                    fontSize: windowWidth < 640 ? "1.125rem" : "1.25rem",
                    fontWeight: "bold",
                    color: currentCharacter.bgColor,
                  }}
                >
                  {currentCharacter.name}
                </h3>
                <p
                  style={{
                    fontSize: windowWidth < 640 ? "0.875rem" : "1rem",
                    color: "#4b5563",
                  }}
                >
                  {currentCharacter.role}
                </p>
                <p
                  style={{
                    fontSize: windowWidth < 640 ? "0.75rem" : "0.875rem",
                    fontStyle: "italic",
                    color: "#6b7280",
                  }}
                >
                  {currentCharacter.catchphrase}
                </p>
              </div>
            </div>
            {/* Title */}
            <div
              style={{
                textAlign: "center",
                marginBottom: windowWidth < 640 ? "1.5rem" : "2rem",
              }}
            >
              <h1
                style={{
                  fontSize: windowWidth < 640 ? "1.5rem" : "1.875rem",
                  fontWeight: "bold",
                  color: "#dc2626",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <Crown size={windowWidth < 640 ? 20 : 24} />
                Grand Line Spelling Challenge
                <Ship size={windowWidth < 640 ? 20 : 24} />
              </h1>
            </div>
            {/* Stage Info */}
            <div
              style={{
                textAlign: "center",
                marginBottom: windowWidth < 640 ? "1rem" : "1.5rem",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#1e40af",
                  color: "white",
                  padding: windowWidth < 640 ? "0.5rem 1rem" : "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  fontSize: windowWidth < 640 ? "0.875rem" : "1rem",
                }}
              >
                Stage {currentStage}/20 - Journey to Laugh Tale
              </div>
            </div>
            {/* Score Display (Cumulative Score Only) */}
            <div
              style={{
                textAlign: "center",
                marginBottom: windowWidth < 640 ? "1rem" : "1.5rem",
                fontSize: windowWidth < 640 ? "1rem" : "1.25rem",
                color: "#2563eb",
                fontWeight: "bold",
              }}
            >
              Score: {totalScore}
            </div>
            {gameStatus === "playing" && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: windowWidth < 640 ? "1rem" : "1.5rem",
                }}
              >
                {/* Control Buttons */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: windowWidth < 480 ? "column" : "row",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Button
                    onClick={speakWord}
                    style={{
                      backgroundColor: "#dc2626",
                      color: "white",
                      width: windowWidth < 480 ? "100%" : "auto",
                      padding: "0.5rem 1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Volume2 size={windowWidth < 640 ? 16 : 20} />
                    Hear Word
                  </Button>
                  <Button
                    onClick={speakSentence}
                    style={{
                      border: "2px solid #facc15",
                      color: "#d97706",
                      width: windowWidth < 480 ? "100%" : "auto",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    Hear Example
                  </Button>
                </div>
                {/* Example Sentence */}
                {showResult && (
                  <div
                    style={{
                      backgroundColor: "#eff6ff",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      textAlign: "center",
                      fontSize: windowWidth < 640 ? "0.875rem" : "1rem",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Example:</span>{" "}
                    {currentWord.sentence}
                  </div>
                )}
                {/* Input Area */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: windowWidth < 480 ? "column" : "row",
                    gap: "0.5rem",
                  }}
                >
                  <Input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your answer..."
                    style={{
                      flex: 1,
                      fontSize: windowWidth < 640 ? "0.875rem" : "1rem",
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !showResult) {
                        checkAnswer();
                      }
                    }}
                  />
                  <Button
                    onClick={checkAnswer}
                    style={{
                      backgroundColor: "#dc2626",
                      color: "white",
                      width: windowWidth < 480 ? "100%" : "auto",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    Check
                  </Button>
                </div>
                {/* Result Display */}
                {showResult && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "1rem",
                      borderRadius: "0.5rem",
                      backgroundColor: isCorrect ? "#f0fdf4" : "#fef2f2",
                      color: isCorrect ? "#16a34a" : "#dc2626",
                      fontSize: windowWidth < 640 ? "0.875rem" : "1rem",
                    }}
                  >
                    {isCorrect ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Skull size={windowWidth < 640 ? 16 : 20} />
                        <span>SUPER! That's correct!</span>
                      </div>
                    ) : (
                      <div>
                        <div>Not quite! The correct spelling is:</div>
                        <div
                          style={{
                            fontSize: windowWidth < 640 ? "1rem" : "1.25rem",
                            marginTop: "0.5rem",
                          }}
                        >
                          {currentWord.word}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {/* Stage Complete Screen */}
            {gameStatus === "stage_complete" && (
              <div
                style={{
                  textAlign: "center",
                  padding: windowWidth < 640 ? "1rem" : "1.5rem",
                  backgroundColor: "#eff6ff",
                  borderRadius: "0.5rem",
                }}
              >
                <h3
                  style={{
                    fontSize: windowWidth < 640 ? "1.25rem" : "1.5rem",
                    fontWeight: "bold",
                    color: "#dc2626",
                    marginBottom: "1rem",
                  }}
                >
                  Stage Complete!
                </h3>
                <p style={{ marginBottom: "1rem" }}>
                  You earned {isCorrect ? 1 : 0} point for this stage.
                </p>
                <Button
                  onClick={() => {
                    console.log("Button clicked!");
                    startNextStage();
                  }}
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    padding: "0.5rem 1.5rem",
                    width: windowWidth < 480 ? "100%" : "auto",
                  }}
                >
                  Set Sail to Stage {currentStage + 1}
                </Button>
              </div>
            )}
            {/* Game Complete Screen */}
            {currentStage > 20 && (
              <div
                style={{
                  textAlign: "center",
                  padding: windowWidth < 640 ? "1rem" : "1.5rem",
                  backgroundColor: "#fefce8",
                  borderRadius: "0.5rem",
                  border: "2px solid #facc15",
                }}
              >
                <Crown
                  style={{
                    margin: "0 auto 1rem",
                    width: windowWidth < 640 ? "32px" : "48px",
                    height: windowWidth < 640 ? "32px" : "48px",
                    color: "#facc15",
                  }}
                />
                <h3
                  style={{
                    fontSize: windowWidth < 640 ? "1.25rem" : "1.5rem",
                    fontWeight: "bold",
                    color: "#dc2626",
                    marginBottom: "1rem",
                  }}
                >
                  You've Found the One Piece!
                </h3>
                <p style={{ marginBottom: "0.5rem" }}>
                  You've completed all stages!
                </p>
                <p
                  style={{
                    fontSize: windowWidth < 640 ? "1.125rem" : "1.25rem",
                    marginBottom: "1rem",
                  }}
                >
                  Final Score: {totalScore}
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  style={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    padding: "0.5rem 1.5rem",
                    width: windowWidth < 480 ? "100%" : "auto",
                  }}
                >
                  Start a New Adventure
                </Button>
              </div>
            )}
            {/* Debug Button to Force Advance Stage 
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Button
                onClick={() => {
                  console.log("Debug button clicked");
                  startNextStage();
                }}
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  padding: "0.5rem 1rem",
                  marginTop: "1rem",
                }}
              >
                Debug: Force Advance Stage
              </Button>
            </div>
*/}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpellingBeeApp;
