const { User, QuestLog, Quest, QuestJunction, QuestLocation, QuestItems } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    //fetch a single user by user_id
    user: async (_, { user_id }) => {
      return User.findByPk(user_id);
    },
    users: async () => {
      return User.findAll();
    },

    //fetch a single quest log by quest_log_id
    questLog: async (_, { quest_log_id }) => {
      return QuestLog.findByPk(quest_log_id);
    },

    //fetch a single quest location by location
    questLocation: async (_, { quest_location_id }) => {
      return QuestLocation.findByPk(quest_location_id);
    },

    //fetch a single quest item by quest_item_id
    questItem: async (_, { quest_item_id }) => {
      return QuestItems.findByPk(quest_item_id);
    },

    //fetch all quests for query
    quests: async () => {
      return Quest.findAll();
    },

    //fetch all quest logs
    questLogs: async () => {
      return QuestLog.findAll();
    },

    //fetch all quest locations
    questLocations: async () => {
      return QuestLocation.findAll();
    },

    //fetch all quest items
    questItems: async (_, { quest_id }) => {
      try {
        const quest = await Quest.findByPk(quest_id);
        if (!quest) {
          throw new Error('Quest not found');
        }
        const questItems = await quest.getQuestItems();
        console.log(questItems);
        return questItems;

      } catch (error) {
        throw new Error(`Failed to fetch quest items: ${error.message}`);
      }
    },

    //fetch a single quest by quest_id with associated quest location and items
    quest: async (_, { quest_id }) => {
      return Quest.findByPk(quest_id, {
        include: [
          { model: QuestLocation },
          { model: QuestItems }
        ]
      });
    },

    //fetch a quest card with quest name, location, and description
    questCard: async (_, { city }) => {
      try {
        // Check if city is provided
        if (!city) {
          throw new Error('City is required');
        }
    
        // Find the quest based on the given city needs to be a findall
        // const questJunction = await Quest.findAll({
        //   include: [
        //     {
        //       model: QuestLocation,
        //       where: { quest_location: city } 
        //     },
        //     { model: QuestItems },
        //     {
        //       model: QuestLog,
        //       include: [
        //         { model: User }
        //       ]
        //     }
        //   ]
        // });
        const questJunction = await QuestLocation.findOne({
            where: {quest_location: city},
            include: [
              {
              model: Quest,
              include: [
                {
                  model: QuestItems
                }, 
                {
                  model: QuestLog,
              include: [
                { model: User }
              
              ]}]
              },
            ]

        })
    
        if (!questJunction) {
          throw new Error('Quest junction not found');
        }
    
        console.log('questJunction:', questJunction);
        console.log('username:', questJunction.Quests);
      
    
        return questJunction.Quests.map(item => ({
          username: item.QuestLog.User.username,
          questName: item.questName,
          quest_location: questJunction.quest_location,
          description: item.questDescription,
        }));
      } catch (error) {
        console.error('Error fetching quest card:', error);
        throw new Error('Error fetching quest card');
      }
    },
  },
  Mutation: {
    // Add user mutation resolver
    addUser: async (_, { username, email, password }) => {
       const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    // Update user mutation resolver
    updateUser: async (_, { user_id, username, email, password }) => {
      const user = await User.findByPk(user_id);
      if (!user) {
        throw new Error('User not found');
      }
      user.username = username;
      user.email = email;
      user.password = password;
      await user.save();
      return user;
    },

    // Delete user mutation resolver
    deleteUser: async (_, { user_id }) => {
      const user = await User.findByPk(user_id);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
      return user;
    },
    // Login user
    login: async (parent, { email, password }) => {
      console.log({email, password})
      const user = await User.findOne({
        where: {
          email
        }
      });
      console.log({user})
      if (!user) {
        throw AuthenticationError;
      }

      const validPassword = await user.checkPassword(password);

      if (!validPassword) {
        console.log(validPassword);
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    // Add quest log mutation resolver
    addQuestLog: async (_, { user_id }) => {
      return QuestLog.create({ user_id });
    },

    // Update quest log mutation resolver
    updateQuestLog: async (_, { quest_log_id, user_id, completionDate }) => {
      const questLog = await QuestLog.findByPk(quest_log_id);
      if (!questLog) {
        throw new Error('Quest log not found');
      }
      questLog.user_id = user_id;
      questLog.completionDate = completionDate;
      await questLog.save();
      return questLog;
    },

    // Delete quest log mutation resolver
    deleteQuestLog: async (_, { quest_log_id }) => {
      const questLog = await QuestLog.findByPk(quest_log_id);
      if (!questLog) {
        throw new Error('Quest log not found');
      }
      await questLog.destroy();
      return questLog;
    },

    // Add quest location mutation resolver
    addQuestLocation: async (_, { questLocation }) => {
      return QuestLocation.create({ questLocation });
    },

    // Update quest location mutation resolver
    updateQuestLocation: async (_, { location, questLocation }) => {
      const questLocationInstance = await QuestLocation.findByPk(location);
      if (!questLocationInstance) {
        throw new Error('Quest location not found');
      }
      questLocationInstance.questLocation = questLocation;
      await questLocationInstance.save();
      return questLocationInstance;
    },

    // Delete quest location mutation resolver
    deleteQuestLocation: async (_, { location }) => {
      const questLocationInstance = await QuestLocation.findByPk(location);
      if (!questLocationInstance) {
        throw new Error('Quest location not found');
      }
      await questLocationInstance.destroy();
      return questLocationInstance;
    },

    // // Add quest junction mutation resolver currently not working
    // addQuestJunction: async (_, { questId, questLocationId }) => {
    //   console.log({ questId, questLocationId });
    //   return QuestJunction.create({ quest_id: questId, location: questLocationId });

    // },

    // // Delete quest junction mutation resolver
    // deleteQuestJunction: async (_, { quest_id, location }) => {
    //   const deletedCount = await QuestJunction.destroy({
    //     where: { quest_id, location }
    //   });
    //   if (deletedCount === 0) {
    //     throw new Error('Quest junction not found');
    //   }
    //   return { quest_id, location };
    // },

    // Add quest items mutation resolver
    addQuestItems: async (_, { itemName, quest_id }) => {
      return QuestItems.create({ itemName, quest_id });
    },

    // Update quest items mutation resolver
    updateQuestItems: async (_, { quest_item_id, itemName }) => {
      const questItems = await QuestItems.findByPk(quest_item_id);
      if (!questItems) {
        throw new Error('Quest items not found');
      }
      questItems.itemName = itemName;
      await questItems.save();
      return questItems;
    },

    // Delete quest items mutation resolver
    deleteQuestItems: async (_, { quest_item_id }) => {
      const questItems = await QuestItems.findByPk(quest_item_id);
      if (!questItems) {
        throw new Error('Quest items not found');
      }
      await questItems.destroy();
      return questItems;
    },

    // Add quest mutation resolver
    addQuest: async (_, { questName, questDescription, quest_log_id, quest_location}) => {
      const location = await QuestLocation.findOrCreate({
        where: {quest_location}});
        console.log(location)
      return Quest.create({ questName, questDescription, quest_log_id, quest_location_id: location[0].quest_location_id });
    },//use findOneOrCreate to find or create a location. 



    // Update quest mutation resolver
    updateQuest: async (_, { quest_id, questName, questDescription, quest_log_id }) => {
      const quest = await Quest.findByPk(quest_id);
      if (!quest) {
        throw new Error('Quest not found');
      }
      quest.questName = questName;
      quest.questDescription = questDescription;
      quest.quest_log_id = quest_log_id;
      await quest.save();
      return quest;
    },

    // Delete quest mutation resolver
    deleteQuest: async (_, { quest_id }) => {
      const quest = await Quest.findByPk(quest_id);
      if (!quest) {
        throw new Error('Quest not found');
      }
      await quest.destroy();
      return quest;
    },
  },
};

module.exports = resolvers;
