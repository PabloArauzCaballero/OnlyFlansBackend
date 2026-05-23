module.exports = { 
    hasAttribute: (Model, attributeName) => {
        return Boolean(Model?.rawAttributes?.[attributeName]);
    },
}
