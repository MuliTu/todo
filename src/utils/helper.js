export const filterByNameAndTags = (input) => (item) => {
  if (input.length > 0) {
    const tags = item?.fields?.Tags || [];
    return (
      tags?.includes(input) ||
      tags.some((i) => i.includes(input)) ||
      item.fields.Text.toLowerCase().includes(input.toLowerCase())
    );
  }
  return true;
};

export const transferTagsToString = (item) => {
  if (typeof item.fields.Tags === "string") {
    const obg = {
      ...item,
      fields: {
        ...item.fields,
        Tags: [...JSON.parse(item.fields.Tags)] || [],
      },
    };
    return obg;
  }
  return item;
};
