const DescriptionTextarea = ({ value, onChange }) => (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="description"
      >
        Description
      </label>
      <textarea
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="description"
        name="description"
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
  
  export default DescriptionTextarea;
  