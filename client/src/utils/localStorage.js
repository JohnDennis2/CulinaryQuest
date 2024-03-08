export const getSavedQuestId = () => {
    const savedBookIds = localStorage.getItem('saved_quest')
      ? JSON.parse(localStorage.getItem('saved_quest'))
      : [];
  
    return getSavedQuestId;
  };
  
  export const saveQuest = (questIdArr) => {
    if (saveQuestIdArr.length) {
      localStorage.setItem('saved_quest', JSON.stringify(savedQuestIdArr));
    } else {
      localStorage.removeItem('saved_quest');
    }
  };
  
 