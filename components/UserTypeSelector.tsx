import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Importing components from your UI library for the select dropdown

// UserTypeSelector is a functional component to display a dropdown for selecting a user type (viewer or editor)
const UserTypeSelector = ({
  userType, // The currently selected user type value (either 'viewer' or 'editor')
  setUserType, // A function to update the userType state
  onClickHandler, // An optional handler function to execute when the selection changes
}: UserTypeSelectorParams) => {
  // This handler updates the userType state and triggers the onClickHandler (if provided)
  const accessChangeHandler = (type: UserType) => {
    setUserType(type); // Update the userType state with the new value
    if (onClickHandler) {
      onClickHandler(type); // Call the provided onClickHandler with the new type
    }
  };

  return (
    // Select component is used to render the dropdown, binding its value to userType and triggering accessChangeHandler on value change
    <Select
      value={userType} // The current value of the select dropdown
      onValueChange={(type: UserType) => accessChangeHandler(type)} // Handles the change in selection
    >
      {/* SelectTrigger is the clickable dropdown component that opens the select menu */}
      <SelectTrigger className="shad-select">
        <SelectValue /> {/* Displays the currently selected value */}
      </SelectTrigger>

      {/* SelectContent is the dropdown menu that appears when the SelectTrigger is clicked */}
      <SelectContent className="border-none bg-dark-200">
        {/* SelectItem components represent the options inside the dropdown */}
        <SelectItem value="viewer" className="shad-select-item">
          can view {/* This option sets the user type to 'viewer' */}
        </SelectItem>
        <SelectItem value="editor" className="shad-select-item">
          can edit {/* This option sets the user type to 'editor' */}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserTypeSelector; // Export the component for use in other parts of the application
