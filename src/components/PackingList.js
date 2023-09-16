import { useState } from "react";
import { Item } from "./Item";

/**
 * Renders a form for adding items to a packing list.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onAddItems - The function to call when a new item is added.
 * @returns {JSX.Element} The JSX element representing the form.
 */
/**
 * Renders a packing list with items.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.items - The list of items to render.
 * @param {Function} props.onDeleteItem - The function to call when an item is deleted.
 * @param {Function} props.onToggleItem - The function to call when an item is toggled.
 * @returns {JSX.Element} The rendered packing list.
 */
export function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
