export const paginate = async (model, query, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const results = await model.find(query).skip(skip).limit(limit);
    const total = await model.countDocuments(query);
    return {
        results,
        total,
        page: parseInt(page, 10),
        totalPages: Math.ceil(total / limit),
    };
};