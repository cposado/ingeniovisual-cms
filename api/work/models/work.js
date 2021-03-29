'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {

  lifecycles: {

    async afterUpdate(result) {
      const { name } = result;
      const changeText = `Updated Work: ${name}`;
      // console.info(name)
      // const statusDeployment = await strapi.query('deployment', 'build-plugin').findOne({ _sort: 'createdAt:desc' });
      // if (statusDeployment) {
      //   await strapi.query('deployment', 'build-plugin').update({ lastChangesPublished: false, lastChange: `Update Work: ${name}`})
      //   // console.log('update Deployment data')
      // } else {
      //   await strapi.query('deployment', 'build-plugin').create({lastChange: `Update Work: ${name}`})
      //   // console.log('no se encontro Deployment')
      // }

      await strapi.services['site-data'].createOrUpdate({lastChangesPublished: false, lastChange: changeText})
    },

    async afterUpdate(result) {
      const { name } = result;
      const changeText = `Created Work: ${name}`;
      // const statusDeployment = await strapi.query('deployment', 'build-plugin').findOne({ _sort: 'createdAt:desc' });
      // if (statusDeployment) {
      //   await strapi.query('deployment', 'build-plugin').update({ lastChangesPublished: false, lastChange: `New Work: ${name}`})
      //   // console.log('update Deployment data')
      // } else {
      //   await strapi.query('deployment', 'build-plugin').create({lastChange: `New Work: ${name}`})
      //   // console.log('no se encontro Deployment')
      // }
      await strapi.services['site-data'].createOrUpdate({lastChangesPublished: false, lastChange: changeText})
    }

  }
};
