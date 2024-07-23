/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import ViewCard from './viewCard';
import { animated, useSpring } from '@react-spring/web';
import Collapse from '@mui/material/Collapse';


const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    'color': theme.palette.text.secondary,
    'borderTopRightRadius': theme.spacing(2),
    'borderBottomRightRadius': theme.spacing(2),
    'paddingRight': theme.spacing(1),
    'fontWeight': theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.focusOpacity})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));


function getHeight({ videos, images }) {
  if (videos != null || images != null) {
    return 160;
  }
  return 160;
}
const StyledTreeItem = React.forwardRef(function StyledTreeItem(props, ref) {
  const theme = useTheme();
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    colorForDarkMode,
    bgColorForDarkMode,
    videos,
    images,
    data,
    onChangeCard,
    ...other
  } = props;

  const styleProps = {
    '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
    '--tree-view-bg-color':
      theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
  };


  return (
    <StyledTreeItemRoot
      slots={{
        groupTransition: TransitionComponent,
      }}
      label={
        <Box
          sx={{
            display: 'grid',
            alignItems: 'center',
            p: 0.5,
            pr: 0,
            height: 150, // getHeight({ videos, images }),
          }}
        >
          <ViewCard data={data} onChangeCard={onChangeCard}></ViewCard>
        </Box>
      }
      style={styleProps}
      {...other}
      ref={ref}
    />
  );
});

// eslint-disable-next-line require-jsdoc
export default function ThreadTreeView({ data, onChangeCard }) {
  function renderTree(nodes) {
    const childrenApproved = Array.isArray(nodes.children) ? nodes.children.filter((x) => x.approved == true) : null;

    const node = nodes.main ? nodes.main : nodes;

    return (
      <StyledTreeItem onChangeCard={onChangeCard} data={node} videos={node.videos} images={node.images} key={node.id} nodeId={node.id} labelText={node.text} labelInfo={node.labelInfo} bgColor={node.bgColor} color={node.color}>
        {Array.isArray(childrenApproved) ?
          childrenApproved.map((node) => renderTree(node)) :
          null}
      </StyledTreeItem>
    );
  }

  return (
    <TreeView
      aria-label="answers"
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ minHeight: 0, maxHeight: 400, flexGrow: 1, maxWidth: 1, overflowY: 'auto' }}
    >
      {renderTree(data)}
    </TreeView>
  );
}
