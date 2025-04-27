import { hollandQuestions, mbtiQuestions } from './data/questions.js';
import { personalityDescriptions, mbtiDescriptions } from './data/descriptions.js';
import { createHollandChart, createMBTIChart } from './components/PersonalityChart.js';
import { hollandLabels, mbtiLabels } from './utils/constants.js';

class PersonalityQuiz {
  constructor() {
    this.step = -1; // -1 for user info form, 0+ for questions
    this.answers = [];
    this.userInfo = {
      name: ''
    };
    this.contribution = {
      R: 0, I: 0, A: 0, S: 0, E: 0, C: 0,
      E_mbti: 0, I_mbti: 0, S_mbti: 0, N_mbti: 0, T_mbti: 0, F_mbti: 0, J_mbti: 0, P_mbti: 0,
    };
    this.questions = [...hollandQuestions, ...mbtiQuestions];
    this.root = document.getElementById('root');
    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
  }

  handleAnswer(value, contribute = {}) {
    const updatedContribution = { ...this.contribution };
    for (const key in contribute) {
      if (updatedContribution.hasOwnProperty(key)) {
        updatedContribution[key] += contribute[key];
      } else if (updatedContribution.hasOwnProperty(`${key}_mbti`)) {
        updatedContribution[`${key}_mbti`] += contribute[key];
      }
    }
    this.contribution = updatedContribution;
    this.answers.push(value);
    this.step++;
    this.render();
  }

  calculateResult() {
    let hollandCount = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    let mbtiCount = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
    // ✅ Define correctedType inside calculateResult
    const correctedType = (type) => {
      const knownTypes = ["RI", "RA", "RS", "RE", "RC", "IA", "IS", "IE", "IC", "AS", "AE", "AC", "SE", "SC", "EC"];
      
      if (knownTypes.includes(type)) {
        return type;
      } else if (knownTypes.includes(type[1] + type[0])) {
        return type[1] + type[0];
      } else {
        return type; // fallback
      }
    };
  
    // ✅ Count answers
    this.answers.forEach((ans, index) => {
      if (index < 3) hollandCount[ans]++;
      else mbtiCount[ans]++;
    });
  
    // ✅ Generate Holland Profile and correct it
    const hollandProfile = Object.entries(hollandCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([key]) => key)
      .join('');
  
    const correctedHollandProfile = correctedType(hollandProfile);
  
    // ✅ Generate MBTI Profile
    const mbtiProfile = [
      mbtiCount.E >= mbtiCount.I ? 'E' : 'I',
      mbtiCount.S >= mbtiCount.N ? 'S' : 'N',
      mbtiCount.T >= mbtiCount.F ? 'T' : 'F',
      mbtiCount.J >= mbtiCount.P ? 'J' : 'P',
    ].join('');
  
    // ✅ Return
    return { hollandProfile: correctedHollandProfile, mbtiProfile, hollandCount, mbtiCount };
  }  

  createProgressBar() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'w-full bg-gray-200 rounded-full h-2.5 mb-6';

    const progressFill = document.createElement('div');
    progressFill.className = 'bg-blue-600 h-2.5 rounded-full transition-all duration-300';
    progressFill.style.width = `${((this.step + 1) / this.questions.length) * 100}%`;

    progressContainer.appendChild(progressFill);
    return progressContainer;
  }

  createQuestionNavigation() {
    const navContainer = document.createElement('div');
    navContainer.className = 'flex justify-center gap-2 mb-6 flex-wrap';

    this.questions.forEach((_, index) => {
      const button = document.createElement('button');
      button.className = `w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
        ${index === this.step ? 'bg-blue-600 text-white' : 
          index < this.answers.length ? 'bg-green-500 text-white' : 
          'bg-gray-200 text-gray-600'}`;
      button.textContent = index + 1;
      button.title = `Question ${index + 1}`;
      button.disabled = index > this.answers.length;

      button.addEventListener('click', () => {
        if (index <= this.answers.length) {
          this.step = index;
          this.answers = this.answers.slice(0, index);
          this.render();
        }
      });

      navContainer.appendChild(button);
    });

    return navContainer;
  }

  render() {
    this.root.innerHTML = '';

    if (this.step === -1) {
      this.renderUserInfoForm();
    } else if (this.step >= this.questions.length) {
      this.renderResults();
    } else {
      this.renderQuestion();
    }
  }

  renderUserInfoForm() {
    const container = document.createElement('div');
    container.className = 'min-h-screen p-8';
    container.style.background = 'linear-gradient(135deg, #e6f0ff 0%, #f0f7ff 100%)';

    const formContainer = document.createElement('div');
    formContainer.className = 'max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 form-container';

    const title = document.createElement('h1');
    title.className = 'text-2xl font-bold mb-6 text-center text-gray-800';
    title.textContent = 'Welcome to Personality Quiz';
    formContainer.appendChild(title);

    const form = document.createElement('form');
    form.className = 'space-y-6';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.step = 0;
      this.render();
    });

    // Name Input
    const nameGroup = document.createElement('div');
    nameGroup.className = 'space-y-2 input-focus-ring';
    
    const nameLabel = document.createElement('label');
    nameLabel.className = 'block text-sm font-medium text-gray-700';
    nameLabel.textContent = 'Your Name';
    nameLabel.htmlFor = 'name';
    nameGroup.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.className = 'w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 form-input';
    nameInput.required = true;
    nameInput.placeholder = 'Enter your name';
    nameInput.addEventListener('input', (e) => {
      this.userInfo.name = e.target.value;
    });
    nameGroup.appendChild(nameInput);

    form.appendChild(nameGroup);

    // Submit Button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 submit-button';
    submitButton.textContent = 'Start Quiz';
    form.appendChild(submitButton);

    formContainer.appendChild(form);
    container.appendChild(formContainer);
    this.root.appendChild(container);
  }

  renderQuestion() {
    const current = this.questions[this.step];
    const container = document.createElement('div');
    container.className = 'p-8 max-w-xl mx-auto';
    container.style.background = 'linear-gradient(135deg, #e6f0ff 0%, #f0f7ff 100%)';

    const title = document.createElement('h1');
    title.className = 'text-2xl font-bold mb-6 text-center';
    title.textContent = 'Personality Mini Quiz';
    container.appendChild(title);

    container.appendChild(this.createProgressBar());

    const progressText = document.createElement('p');
    progressText.className = 'text-sm text-gray-600 mb-4 text-center';
    progressText.textContent = `Question ${this.step + 1} of ${this.questions.length}`;
    container.appendChild(progressText);

    container.appendChild(this.createQuestionNavigation());

    const questionCard = document.createElement('div');
    questionCard.className = 'bg-white p-6 rounded-lg shadow';

    const questionText = document.createElement('h2');
    questionText.className = 'text-xl font-semibold mb-4';
    questionText.textContent = current.question;
    questionCard.appendChild(questionText);

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'space-y-3';

    current.options.forEach((opt, idx) => {
      const button = document.createElement('button');
      button.className = 'w-full p-3 bg-gray-100 hover:bg-gray-200 rounded shadow transition-colors';
      button.textContent = opt.label;
      button.addEventListener('click', () => this.handleAnswer(opt.value, opt.contribute));
      optionsContainer.appendChild(button);
    });

    questionCard.appendChild(optionsContainer);
    container.appendChild(questionCard);
    this.root.appendChild(container);
  }

  renderResults() {
    const { hollandProfile, mbtiProfile, hollandCount, mbtiCount } = this.calculateResult();
    const hollandInfo = personalityDescriptions[hollandProfile] || {};
    const mbtiInfo = mbtiDescriptions[mbtiProfile] || {};

    const container = document.createElement('div');
    container.className = 'min-h-screen p-8';
    container.style.background = 'linear-gradient(135deg, #e6f0ff 0%, #f0f7ff 100%)';

    const title = document.createElement('h1');
    title.className = 'text-3xl font-bold mb-8 text-center text-gray-800';
    title.textContent = `${this.userInfo.name}'s Personality Results`;
    container.appendChild(title);

    // User Info Display
    const userInfoCard = document.createElement('div');
    userInfoCard.className = 'max-w-md mx-auto bg-white rounded-lg shadow p-6 mb-8 user-info-card';
    userInfoCard.innerHTML = `
      <div class="text-center">
        <p class="text-sm text-gray-500">Name</p>
        <p class="font-medium text-lg">${this.userInfo.name}</p>
      </div>
    `;
    container.appendChild(userInfoCard);

    const resultsGrid = document.createElement('div');
    resultsGrid.className = 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12';
    container.appendChild(resultsGrid);

    // Holland Results Card
    const hollandCard = this.createResultCard(
      'Holland Personality Type',
      hollandProfile,
      hollandInfo.summary,
      hollandInfo.description,
      hollandInfo.careers,
      createHollandChart(hollandCount)
    );
    resultsGrid.appendChild(hollandCard);

    // MBTI Results Card
    const mbtiCard = this.createResultCard(
      'MBTI Personality Type',
      mbtiProfile,
      mbtiInfo.nickname,
      mbtiInfo.description,
      null,
      createMBTIChart(mbtiCount)
    );
    resultsGrid.appendChild(mbtiCard);

    // Contribution Impact Section
    const contributionSection = document.createElement('div');
    contributionSection.className = 'bg-white rounded-lg shadow p-6 max-w-4xl mx-auto mb-8';
    
    const contributionTitle = document.createElement('h2');
    contributionTitle.className = 'text-2xl font-semibold mb-6 text-center text-gray-800';
    contributionTitle.textContent = 'Contribution Impact Analysis';
    contributionSection.appendChild(contributionTitle);

    // Holland Dimensions
    const hollandDimensions = document.createElement('div');
    hollandDimensions.className = 'mb-8';
    hollandDimensions.innerHTML = `
      <h3 class="text-xl font-semibold mb-4 text-gray-700">Holland Dimensions:</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        ${["R", "I", "A", "S", "E", "C"].map(key => `
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="font-medium text-gray-700">${hollandLabels[key]}</p>
            <p class="text-2xl font-bold text-blue-600">${this.contribution[key] || 0}</p>
          </div>
        `).join('')}
      </div>
    `;
    contributionSection.appendChild(hollandDimensions);

    // MBTI Dimensions
    const mbtiDimensions = document.createElement('div');
    mbtiDimensions.innerHTML = `
      <h3 class="text-xl font-semibold mb-4 text-gray-700">MBTI Dimensions:</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        ${["E", "I", "S", "N", "T", "F", "J", "P"].map(key => `
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="font-medium text-gray-700">${mbtiLabels[key]}</p>
            <p class="text-2xl font-bold text-teal-600">${this.contribution[`${key}_mbti`] || 0}</p>
          </div>
        `).join('')}
      </div>
    `;
    contributionSection.appendChild(mbtiDimensions);

    container.appendChild(contributionSection);

    // Retake Button
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'text-center mt-8';
    
    const retakeButton = document.createElement('button');
    retakeButton.className = 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200';
    retakeButton.textContent = 'Retake Quiz';
    retakeButton.addEventListener('click', () => {
      this.step = 0;
      this.answers = [];
      this.contribution = {
        R: 0, I: 0, A: 0, S: 0, E: 0, C: 0,
        E_mbti: 0, I_mbti: 0, S_mbti: 0, N_mbti: 0, T_mbti: 0, F_mbti: 0, J_mbti: 0, P_mbti: 0,
      };
      this.render();
    });
    buttonContainer.appendChild(retakeButton);
    container.appendChild(buttonContainer);

    this.root.appendChild(container);
  }

  createResultCard(title, type, summary, description, careers, chart) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-lg p-6';

    const cardTitle = document.createElement('h2');
    cardTitle.className = 'text-2xl font-semibold mb-4 text-gray-800';
    cardTitle.textContent = title;
    card.appendChild(cardTitle);

    card.appendChild(chart);

    const typeContainer = document.createElement('div');
    typeContainer.className = 'mt-4 p-4 bg-blue-50 rounded-lg';
    typeContainer.innerHTML = `<span class="font-medium text-gray-700">Type:</span> <span class="text-xl font-bold text-blue-600">${type}</span>`;
    card.appendChild(typeContainer);

    if (summary) {
      const summaryText = document.createElement('p');
      summaryText.className = 'mt-4 text-lg italic text-gray-600';
      summaryText.textContent = summary;
      card.appendChild(summaryText);
    }

    if (description) {
      const descriptionText = document.createElement('p');
      descriptionText.className = 'mt-4 text-gray-700';
      descriptionText.textContent = description;
      card.appendChild(descriptionText);
    }

    if (careers) {
      const careersSection = document.createElement('div');
      careersSection.className = 'mt-6';
      
      const careersTitle = document.createElement('h3');
      careersTitle.className = 'text-xl font-semibold mb-3 text-gray-800';
      careersTitle.textContent = 'Recommended Careers:';
      careersSection.appendChild(careersTitle);

      const careersList = document.createElement('ul');
      careersList.className = 'list-disc list-inside space-y-2';
      careers.forEach(career => {
        const li = document.createElement('li');
        li.className = 'text-gray-700';
        li.textContent = career;
        careersList.appendChild(li);
      });
      careersSection.appendChild(careersList);

      card.appendChild(careersSection);
    }

    return card;
  }
}

// Initialize the quiz when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PersonalityQuiz();
}); 
