import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
  Image,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

import icons from '../../filenames.json';
import usePropertiesStore from '../Store/PropertiesStore';

function IconPicker() {
  const {
    rowsInOnePage,
    columnsInOnePage,
    iconHeight,
    iconWidth,
    pickerHeight,
    pickerWidth,
    setRowsInOnePage,
    setColumnsInOnePage,
    setIconHeight,
    setIconWidth,
    setPickerHeight,
    setPickerWidth,
  } = usePropertiesStore((state) => ({
    rowsInOnePage: state.rowsInOnePage,
    columnsInOnePage: state.columnsInOnePage,
    iconHeight: state.iconHeight,
    iconWidth: state.iconWidth,
    pickerHeight: state.pickerHeight,
    pickerWidth: state.pickerWidth,
    setRowsInOnePage: state.setRowsInOnePage,
    setColumnsInOnePage: state.setColumnsInOnePage,
    setIconHeight: state.setIconHeight,
    setIconWidth: state.setIconWidth,
    setPickerHeight: state.setPickerHeight,
    setPickerWidth: state.setPickerWidth,
  }));

  const rowsRef = useRef(rowsInOnePage);
  const columnsRef = useRef(columnsInOnePage);
  const iconHeightRef = useRef(iconHeight);
  const iconWidthRef = useRef(iconWidth);
  const pickerHeightRef = useRef(pickerHeight);
  const pickerWidthRef = useRef(pickerWidth);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showIconPicker, setShowIconPicker] = useState(true);

  useEffect(() => {
    rowsRef.current.value = rowsInOnePage;
    columnsRef.current.value = columnsInOnePage;
    iconHeightRef.current.value = iconHeight;
    iconWidthRef.current.value = iconWidth;
    pickerHeightRef.current.value = pickerHeight;
    pickerWidthRef.current.value = pickerWidth;
  }, [
    rowsInOnePage,
    columnsInOnePage,
    iconHeight,
    iconWidth,
    pickerHeight,
    pickerWidth,
  ]);

  const iconsPerPage =
    Number(rowsRef.current?.value) * Number(columnsRef.current?.value) || 9;
  const iconList = icons.map((icon) => icon.Image);

  const totalPages = Math.ceil(iconList.length / iconsPerPage);

  const startIndex = (currentPage - 1) * iconsPerPage;
  const currentIcons = iconList.slice(startIndex, startIndex + iconsPerPage);

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePropertiesChange = () => {
    setRowsInOnePage(Number(rowsRef.current.value));
    setColumnsInOnePage(Number(columnsRef.current.value));
    setIconHeight(Number(iconHeightRef.current.value));
    setIconWidth(Number(iconWidthRef.current.value));
    setPickerHeight(Number(pickerHeightRef.current.value));
    setPickerWidth(Number(pickerWidthRef.current.value));
    setCurrentPage(1);
  };

  const handleResetProperties = () => {
    setRowsInOnePage(3);
    setColumnsInOnePage(3);
    setIconHeight(50);
    setIconWidth(50);
    setPickerHeight(500);
    setPickerWidth(500);

    rowsRef.current.value = 3;
    columnsRef.current.value = 3;
    iconHeightRef.current.value = 50;
    iconWidthRef.current.value = 50;
    pickerHeightRef.current.value = 500;
    pickerWidthRef.current.value = 500;

    setCurrentPage(1);
  };

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    setShowIconPicker(false);
  };

  const handleResetSelection = () => {
    setSelectedIcon(null);
    setShowIconPicker(true);
  };

  return (
    <Flex justify="center" align="center" gap="8rem" h="100vh">
      {showIconPicker && (
        <Box display={{ base: 'none', lg: 'block' }} h="50rem" w="20rem">
          <Stack align="center">
            <Text
              textAlign="center"
              fontSize={['1.7rem', '2.2rem']}
              fontWeight="600"
            >
              Set Icon Picker Properties
            </Text>
            <Flex
              direction="column"
              border="2px solid #ce1567"
              w={['20rem', '27rem']}
              px={['1rem', '2rem']}
              py={['1rem', '2rem']}
              borderRadius="0.8rem"
              mb="1rem"
            >
              <FormControl>
                <FormLabel>Rows in One Page</FormLabel>
                <Input
                  type="number"
                  ref={rowsRef}
                  id="rows"
                  name="rows"
                  placeholder="Enter the number of rows"
                />
                <FormLabel>Columns in One Page</FormLabel>
                <Input
                  type="number"
                  ref={columnsRef}
                  id="column"
                  name="column"
                  placeholder="Enter the number of columns"
                />
                <FormLabel>Icon Height (px)</FormLabel>
                <Input
                  type="number"
                  ref={iconHeightRef}
                  id="iconHeight"
                  name="iconHeight"
                  placeholder="Enter the icon height"
                />
                <FormLabel>Icon Width (px)</FormLabel>
                <Input
                  type="number"
                  ref={iconWidthRef}
                  id="iconWidth"
                  name="iconWidth"
                  placeholder="Enter the icon width"
                />
                <FormLabel>Picker Height (px)</FormLabel>
                <Input
                  type="number"
                  ref={pickerHeightRef}
                  id="pickerHeight"
                  name="pickerHeight"
                  placeholder="Enter the picker height"
                />
                <FormLabel>Picker Width (px)</FormLabel>
                <Input
                  type="number"
                  ref={pickerWidthRef}
                  id="pickerWidth"
                  name="pickerWidth"
                  placeholder="Enter the picker width"
                />
                <Button
                  mt="4"
                  colorScheme="pink"
                  onClick={handlePropertiesChange}
                >
                  Confirm
                </Button>
                <Button
                  mt="4"
                  colorScheme="gray"
                  onClick={handleResetProperties}
                >
                  Reset to Default
                </Button>
              </FormControl>
            </Flex>
          </Stack>
        </Box>
      )}

      <Box display={{ base: 'none', lg: 'block' }}>
        <Stack align="center">
          {selectedIcon ? (
            <Box
              border="2px solid #ce1567"
              w="auto"
              h="auto"
              py={['1rem', '2rem']}
              borderRadius="0.8rem"
              mb="1rem"
              overflow="hidden"
            >
              <Image
                src={selectedIcon}
                alt="selected-icon"
                height={`${iconHeight}px`}
                width={`${iconWidth}px`}
                objectFit="contain"
                padding="0.5rem"
              />
              <Button mt="4" colorScheme="gray" onClick={handleResetSelection}>
                Back to Icon Picker
              </Button>
            </Box>
          ) : (
            <>
              <Text
                textAlign="center"
                fontSize={['1.7rem', '2.2rem']}
                fontWeight="600"
              >
                Pick an Icon!!
              </Text>
              <Flex
                direction="column"
                border="2px solid #ce1567"
                w={pickerWidth ? `${pickerWidth}px` : 'auto'}
                h={pickerHeight ? `${pickerHeight}px` : 'auto'}
                py={['1rem', '2rem']}
                borderRadius="0.8rem"
                mb="1rem"
                overflow="auto"
              >
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Icons
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Box
                        h={
                          pickerHeight
                            ? `${pickerHeight - 80}px`
                            : 'calc(50rem - 80px)'
                        }
                        overflowY="auto"
                        w={
                          pickerWidth
                            ? `${pickerWidth - 40}px`
                            : 'calc(50rem - 40px)'
                        }
                        overflowX="scroll"
                        css={{
                          '&::-webkit-scrollbar': {
                            height: '8px',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#805ad5',
                            borderRadius: '8px',
                          },
                        }}
                      >
                        <SimpleGrid
                          columns={columnsInOnePage}
                          spacing="auto"
                          flexWrap="wrap"
                          justifyItems="center"
                        >
                          {currentIcons.map((iconName, index) => (
                            <Box
                              // eslint-disable-next-line react/no-array-index-key
                              key={index}
                              boxSize={`${iconWidth}px`}
                              bg="gray.100"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              mb={4}
                              borderRadius="md"
                              p={2}
                              onClick={() => handleIconClick(iconName)}
                              cursor="pointer"
                            >
                              <Image
                                src={iconName}
                                alt={`icon-${index}`}
                                height={`${iconHeight}px`}
                                width={`${iconWidth}px`}
                                objectFit="contain"
                                padding="0.5rem"
                              />
                            </Box>
                          ))}
                        </SimpleGrid>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
              <Flex justify="space-between" mt="1rem">
                <Button
                  onClick={handlePreviousClick}
                  colorScheme="pink"
                  size="sm"
                  isDisabled={currentPage === 1}
                  aria-label="Previous Page"
                >
                  Previous
                </Button>
                <Text align="center" justifyContent="center">
                  Page {currentPage} of {totalPages}
                </Text>
                <Button
                  onClick={handleNextClick}
                  colorScheme="pink"
                  size="sm"
                  isDisabled={currentPage === totalPages}
                  aria-label="Next Page"
                >
                  Next
                </Button>
              </Flex>
            </>
          )}
        </Stack>
      </Box>
    </Flex>
  );
}

export default IconPicker;
