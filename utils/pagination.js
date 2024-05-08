export const paginate = async (Model, query, page = 1, limit = 10, sort = "createdAt",leftJoin) => {
  const offset = (page - 1) * limit;
  const options = {
    where: {
      ...query
    },
    offset,
    limit,
    order: [[sort, "DESC"]],
    include: leftJoin
  };
  const { count, rows } = await Model.findAndCountAll(options);
  const totalPages = Math.ceil(count / limit);
  const data = { rows, totalPages };
  return data;
};
