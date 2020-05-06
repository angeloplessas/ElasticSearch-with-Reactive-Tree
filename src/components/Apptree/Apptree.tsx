import React, {useCallback, useState} from 'react';
import PinchZoomPan from 'pinch-zoom-pan';
import { IFamilyNode, IFamilyExtNode } from '../../moduleChange/relatives-tree';
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from '../FamilyNode/FamilyNode';
import styles from './Apptree.module.css';

const WIDTH = 150;
const HEIGHT = 190;

type IState = {
  myID: string;
  nodes: object;
}

export const Apptree = ({ myID, nodes }: IState) => {  
  
  const [rootId, setRootId] = useState(myID);
  const onResetClick = useCallback(() => setRootId(myID), [
    console.log("Apptree: ", "\nrootId=", rootId, " myID=", myID, " nodes=", nodes)
  ]);

  return (
    <div className={styles.apptree}>      
      <PinchZoomPan
          // debug
          captureWheel
          min={0.1}
          max={5}
          className={styles.wrapper}
        >
          <ReactFamilyTree
            nodes={nodes as IFamilyNode[]}
            rootId={myID}
            // rootId="root"
            width={WIDTH}
            height={HEIGHT}
            canvasClassName={styles.tree}
            renderNode={(node: IFamilyExtNode) => (
              <FamilyNode
                key={node.id}
                node={node}
                isRoot={node.id === myID}
                onSubClick={setRootId}
                style={{
                  width: WIDTH,
                  height: HEIGHT,
                  transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                }}
              />
            )}
          />
        </PinchZoomPan>
        {/* {rootId !== myID && (
          <div className={styles.reset} onClick={onResetClick}>
            Reset
          </div>
        )} */}
    </div>
  );
}

export default React.memo(Apptree);